import dotenv from 'dotenv'
import cors from 'cors'
import mongodb from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import path from 'path'
import crypto from 'crypto'
import CryptoJS from 'crypto-js' // doesn't support partial imports as of writing :(


dotenv.config()

const MongoClient = mongodb.MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
    sslKey: process.env.CRED_PATH,
    sslCert: process.env.CRED_PATH
},
{ useUnifiedTopology: true }, { useNewUrlParser: true })

const PORT = process.env.PORT || 8000
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer().any())

// client.connect(err => {
//     if (err) throw err
//     console.log("db connected");
// })


/* user interface (db)

{
    email: <email>
    userinfo: {
        password: <password> <---encrypted!
        first: <first>
        last: <last>
        bio: <bio>
        followers: <followers>
        following: <following>
        pfp: <picturename>
    }
}
 */


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})


/// ******* MY CODE 

const postObject = {
    uniqueID: Number,  
    price: Number, 
    distance: Number, // distance from campus, in miles
    address: String,
    rentByDate: String, // (fall 2022, winter 2023, etc)
    seller: userObject,
    favorites: userObject[],
    bathrooms: Number,
    bedrooms: Number,
    amenities: String,
    facilities: String,
    images: String[]
};

const userObject = {
    uniqueID: String, 
    uniqueUsername: String, 
    password: String,
    firstName: String,
    lastName: String,
    favoritedPosts: postObject[], 
    pfp: '',
    followers: userObject[], 
    following: userObject[], 
    phoneNumber: String 
};


export const getPosts = async (req, res) => {

    try {

        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
       
    } catch (error) {

        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {

    const post = req.body;

    const newPost = new postObject(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {

        res.status(409).json({ message: error.message});

    }
}

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, {new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post Deleted Successfully'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');


    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});

    res.json(updatedPost);
}

/// ******* MY CODE 


app.post('/api/uploadimg', async (req, res) => {
    await client.connect()
    const db = client.db('projectdb')
    const storage = new GridFsStorage({ db: db, options: { useUnifiedTopology: true, useNewUrlParser: true}, file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err, buf) => {
                if (err) {
                    return reject(err);
                }
                let filename
                let fileInfo
                if (req.body && req.body.listingName) { // if listingName specified, treat as a listing name
                    filename = file.originalname
                    fileInfo = {
                        filename: filename,
                        bucketName: 'fs',
                        metadata: `${req.body.price},${req.body.location}`
                    }
                } else {
                    filename = buf.toString('hex') + path.extname(file.originalname)
                    fileInfo = {
                        filename: filename,
                        bucketName: 'fs',
                    }
                }
                // const fileInfo = {
                //     filename: filename,
                //     bucketName: 'fs',
                // }
                if (req.body && req.body.email) { // if email attached to image upload (treated as profile picture)
                    const theUser = await db.collection('userinfo').findOne({ email: req.body.email })
                    const oldPfpName = theUser.userinfo.pfp
                    if (oldPfpName) {
                        await deleteImg(oldPfpName)
                    }
                    await db.collection('userinfo').updateOne({email: req.body.email}, {$set: {'userinfo.pfp': filename}})
                }
                
                resolve(fileInfo);
            })
        })
    }})
    // const upload = multer({ storage }).any('labelimg')
    const upload = multer({ storage }).any()
    upload(req, res, async function (err) {
        console.log(req.body);
        if (err) {
            // This is a good practice when you want to handle your errors differently
            console.error(err);
            await client.close()
            return
        }
        await client.close()
        // Everything went fine 
    })
})

// *****
app.post('/api/getuser', async (req, res) => {
    let userEmail = req.body.userEmail
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    let result
    try {
        result = await collection.findOne({ email: userEmail })
    } catch (err) {
        console.error(err)
    } finally {
        res.send({ result: result })
        await client.close()
    }
})


app.post('/api/signin', async (req, res) => {
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    let isValid = false
    try {
        let user = await collection.findOne({ email: userEmail })
        isValid = decryptString(user.userinfo.password) === userPassword
    } catch (err) {
        console.error(err)
    } finally {
        res.send({ isValid: isValid })
    }
})

// this assumes user does not yet exist, always check this first
app.post('/api/adduser', async (req, res) => {
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword
    let first = req.body.first
    let last = req.body.last
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    let userOb = {
        email: userEmail,
        userinfo: {
            password: encryptString(userPassword),
            first: first,
            last: last,
            bio: '',
            followers: [],
            following: [],
            pfp: ''
        }
    }
    try {
        await collection.insertOne(userOb)
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
})



app.post('/api/getimg', async (req, res) => {
    let fileName = req.body.fileName
    await client.connect()

    const db = client.db('projectdb')
    const filescoll = db.collection('fs.files')
    const chunkscoll = db.collection('fs.chunks')


    try {
        const docs = await filescoll.find({ filename: fileName }).toArray()
        if (!docs || docs.length === 0) return // file not found
        else {
            try {
                const chunks = await chunkscoll.find({ files_id: docs[0]._id }).sort({ n: 1 }).toArray()
                if (!chunks || chunks.length === 0) return
                let fileData = []
                for (let i = 0; i < chunks.length; i++) {
                    fileData.push(chunks[i].data.toString('base64'))
                }
                let finishedFile = `data:${docs[0].contentType};base64,${fileData.join('')}`
                res.send({ base64Data: finishedFile})
            } catch (err) {
                throw err
            }
        }
    } catch (err) {
        console.error(err)
        // throw err // still want to crash
    } finally {
        await client.close()
    }
})

app.post('/api/getdummydata', async (req, res) => {
    let fileName = req.body.fileName
    console.log(fileName)
    await client.connect()
    const db = client.db('projectdb')
    const filescoll = db.collection('fs.files')
    const chunkscoll = db.collection('fs.chunks')
    try {
        const file = await filescoll.findOne({ filename: fileName })
        const chunks = await chunkscoll.find({ files_id: file._id }).sort({ n: 1 }).toArray()
        if (!chunks || chunks.length === 0) return
        let fileData = []
        for (let i = 0; i < chunks.length; i++) {
            fileData.push(chunks[i].data.toString('base64'))
        }
        let finishedFile = `data:${file.contentType};base64,${fileData.join('')}`
        res.send({ base64Data: finishedFile, infostring: file.metadata })
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
})



app.post('/api/test', async (req, res) => {
    res.send({ express: "APP IS CONNECTED" })
    await client.connect()
    console.log(req.body)
    let data = { myData: req.body.MYDATA }
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    try {
        await collection.insertOne(data)
    } catch (err) {
        console.error(err)
        // throw err // still want to crash
    } finally {
        await client.close()
    }
})

function decryptString(string) {
    return CryptoJS.AES.decrypt(string, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
}

function encryptString(string) {
    return CryptoJS.AES.encrypt(string, ENCRYPTION_KEY).toString()
}

async function deleteImg(imgName) {
    await client.connect()
    const db = client.db('projectdb')
    const filescoll = db.collection('fs.files')
    const chunkscoll = db.collection('fs.chunks')
    try {
        if (!imgName) return
        const docs = await filescoll.find({ filename: fileName }).toArray()
        if (!docs || docs.length === 0) return // file not found
        const chunks = await chunkscoll.find({ files_id: docs[0]._id }).sort({ n: 1 }).toArray()
        if (chunks && chunks.length !== 0) {
            await chunkscoll.deleteMany({ files_id: docs[0]._id})
        }
        await filescoll.deleteOne({_id: docs[0]._id})
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
}