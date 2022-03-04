import dotenv from 'dotenv'
import cors from 'cors'
import mongodb from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import path from 'path'
import crypto from 'crypto'
import jwt from "jsonwebtoken"
import CryptoJS from 'crypto-js' // doesn't support partial imports as of writing :(
import authenticateJWT from './middleware/authenticate.js'
import { ObjectId } from 'mongodb'


dotenv.config()

const MongoClient = mongodb.MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
    sslKey: process.env.CRED_PATH,
    sslCert: process.env.CRED_PATH
},
{ useUnifiedTopology: true }, { useNewUrlParser: true })


// const client_ = new MongoClient(process.env.MONGO_URI);


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

// const postObject = {
//     uniqueID: Number,  
//     price: Number, 
//     distance: Number, // distance from campus, in miles
//     address: String,
//     rentByDate: String, // (fall 2022, winter 2023, etc)
//     seller: userObject,
//     favorites: userObject[],
//     bathrooms: Number,
//     bedrooms: Number,
//     amenities: String,
//     facilities: String,
//     images: String[]
// };

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


app.post('/api/getposts', async (req, res) => {
    console.log(req.body.id)
    var ObjectId = mongodb.ObjectID
    var obj_id = ObjectId(req.body.id)
    var rez;
    var imagedata;
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('fs.files')
    const image_collection = db.collection('fs.chunks')
    let result = {}
    try {
        rez = await collection.findOne(obj_id);
        result['file'] = rez._id;
        result['metadata'] = rez.metadata;
        imagedata = await image_collection.findOne({ files_id : rez._id })
        result['base64'] = imagedata.data

    } catch (err) {
        console.error(err)
    }     
    
    finally {
        console.log(result.file);
        res.send({ result:result });
        await client.close()
    }
})


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
                    const theUser = await db.collection('userinfo').findOne({ username: req.body.username })
                    const oldPfpName = theUser.userinfo.pfp
                    if (oldPfpName) {
                        await deleteImg(oldPfpName)
                    }
                    await db.collection('userinfo').updateOne({username: req.body.username}, {$set: {'userinfo.pfp': filename}})
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
            res.send({ result: 201 })
            return
        }
        await client.close()
        res.send({ result: 200 })
        // Everything went fine 
    })
})

// *****
app.post('/api/getuser', async (req, res) => {
    let username = req.body.username
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    let result = null
    try {
        result = await collection.findOne({ username: username })
    } catch (err) {
        console.error(err)
    } finally {
        console.log(result);
        res.send({ result:result });
        await client.close()
    }
})


app.post('/api/signin', async (req, res) => {
    var secretKey;
    var token;
    let userEmail = req.body.userEmail
    let username = req.body.username
    let userPassword = req.body.userPassword
    try {
        await client.connect();
    }
    catch(err) {
        res.json({
            res: 500
        })
    }
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    let isValid = false
    try {
        let user
        user = await collection.findOne({ username: username })
        // if (userEmail) {
        //     user = await collection.findOne({ email: userEmail })
        // } else {
        //     user = await collection.findOne({ username: username })
        // }
        isValid = decryptString(user.userinfo.password) === userPassword
        if (isValid) {
            secretKey = process.env.TOKEN_SECRET;
            token = jwt.sign(username, process.env.TOKEN_SECRET);
            res.json(
                {
                    res: 200,
                    token: token
                }
            );
        }
    } catch (err) {
        console.log(err);
        res.json({
            res: 500
        })
        console.error(err)
    } finally {
        res.json({res:401}) 
    }
})

app.get('/api/testValidation', authenticateJWT, async (req, res) => {
    res.json(200);
})

// this assumes user does not yet exist, always check this first
app.post('/api/adduser', async (req, res) => {    
    console.log(process.env.MONGO_URI);
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword
    let userName = req.body.userName
    let first = req.body.first
    let last = req.body.last
    try {
        await client.connect();
    }
    catch {
        console.log("ERR: ")
    }
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    try {
        let sameEmail = await collection.findOne({ email: userEmail })
        let sameUsername = await collection.findOne({ username: userName })
        if (sameEmail || sameUsername) {
            // await client.close()
            res.send({ result: 201 })
            return
        }
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
        // await client.close()
    }
    let userOb = {
        email: userEmail,
        username: userName,
        userinfo: {
            password: encryptString(userPassword),
            first: first,
            last: last,
            bio: '',
            followers: [],
            following: [],
            pfp: '',
            phoneNumber: '',
            favoritedPosts: []
        }
    }
    try {
        await collection.insertOne(userOb)
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    } finally {
        // await client.close()
    }
})

//api for post
app.post('/api/addpost', async (req, res) => {

    let price = req.body.price
    let bedrooms = req.body.bedrooms
    let bathrooms = req.body.bathrooms
    let amenities = req.body.amenities
    let facilities = req.body.facilities
    let address = req.body.adress
    let rentDate = req.body.rentDate

    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')

    try {
        let sameID = await collection.findOne({ id: uniqueID })
        if (sameID) {
          //  await client.close()
            res.send({ result: 201 })
            return
        }
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
        // await client.close()
    }

    let postObject = {
        uniqueID: Number,
        price: Number, 
        distance: Number, // distance from campus, in miles
        address: String,
        rentByDate: String, // (fall 2022, winter 2023, etc)
        seller: String,
        favorites: [],
        bathrooms: Number,
        bedrooms: Number,
        amenities: String,
        facilities: String,
        images: [] 
    }

    try {
        await collection.insertOne(postOb)
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
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
    const filescoll = awaitdb.collection('fs.files')
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

app.post('/api/follow', async (req, res) => {
    let follower = req.body.follower
    let followee = req.body.followee
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    try {
        await collection.updateOne({username: follower}, {$push: {'userinfo.following': followee}})
        await collection.updateOne({username: followee}, {$push: {'userinfo.followers': follower}})
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    } finally {
        await client.close()
    }
})

app.post('/api/unfollow', async (req, res) => {
    let follower = req.body.follower
    let followee = req.body.followee
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    try {
        await collection.updateOne({username: follower}, {$pull: {'userinfo.following': followee}})
        await collection.updateOne({username: followee}, {$pull: {'userinfo.following': follower}})
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    } finally {
        await client.close()
    }
})

app.post('/api/updateuser', async (req, res) => {
    let updatedUser = req.body.updatedUser
    let userEmail = updatedUser.email
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    await client.connect()
    try {
        let user = await collection.findOne({ email: userEmail })
        let checkdupe = await collection.findOne({ username: updatedUser.username })
        if (checkdupe) {
            res.send({ result: 201 }) // username already exists
            return
        }
        updatedUser.userinfo.password = user.userinfo.password
        await collection.updateOne({email: userEmail}, updatedUser)
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
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