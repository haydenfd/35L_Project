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
        // console.log(postMessages);
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
    // console.log(req.body.id)
    var ObjectId = mongodb.ObjectID
    var obj_id = ObjectId(req.body.id)
    var rez;
    var imagedata;
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('fs.files')
    const image_collection = db.collection('fs.chunks')
    const post_collection = db.collection('posts')
    let result = {}
    try {
        let post_id = await post_collection.findOne({images:obj_id},{ "images.$:": 0 })
        rez = await collection.findOne(obj_id);
        // console.log(rez)
        result['file'] = rez._id;
        result['metadata'] = rez.metadata;
        result['postId'] = post_id._id.toString();
        imagedata = await image_collection.findOne({ files_id : rez._id })
        result['base64'] = imagedata.data

    } catch (err) {
        console.error(err)
    }     
    
    finally {
        // console.log(result.file);
        res.send({ result:result });
        await client.close()
    }
})

app.post("/api/getprof", async (req, res) => {
    // console.log(req.body.filename)
    var image;
    var imagedata;
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('fs.files')
    const images = db.collection('fs.chunks')
    let result = {}
    try {
        // console.log(req.body.filename)
        image = await collection.findOne( { filename: req.body.filename } );
        let id = image._id;
        imagedata = await images.findOne( { files_id: id } );
        // let image_data = await images.findOne({ files_id:image_id })
    }
    catch(err) {
        console.log(err)
    }
    finally {
        console.log("IN THE END")
        res.send({imagedata})
        await client.close()
    }
})

app.post("/api/getprof", )

app.post('/api/get_multiple_posts', async (req, res) => {
    var ObjectID = mongodb.ObjectID
    const db = client.db('projectdb')
    const collection = db.collection('fs.files')
    const image_collection = db.collection('fs.chunks')
    var response;
    var imagedata;
    await client.connect()
    let result = []
    try {
        for (let i = 0; i < req.body.ids.length; i++) {
            let obj_id = ObjectId(req.body.ids[i])
            let rez = {}
            response = await collection.findOne(obj_id)
            rez['file'] = response._id
            rez['metadata'] = response.metadata
            imagedata = await image_collection.findOne( { files_id: response._id } )
            rez['base64'] = imagedata.data
            result.push(rez)
        }
    } catch(err) {
        console.log(err)
    }
    finally {
        // console.log(result)
        res.send( {result: result} )
        await client.close()
    }
})

app.post('/api/get_image_from_filename', async (req, res) => {
    var filename = req.body.filename
    var imagedata
    const db = client.db('projectdb')
    const collection = db.collection('fs.files')
    await client.connect()
    try {
        imagedata = await collection.findOne( {filename:filename} )
    }
    catch(err) {console.log(err)}
    finally {
        // console.log(imagedata)
        res.send(imagedata)
        await client.close()
    }
})

app.post('/api/uploadimg', async (req, res) => {
    // randomize filename generation
    const chars_ = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    var random_filename = ''
    const char_length = chars_.length
    for (let i = 0; i < 25; i++) {
        random_filename += chars_.charAt(Math.floor(Math.random() * char_length))
    }
    random_filename += '.jpeg'
    await client.connect()
    const db = client.db('projectdb')
    var fileInfo
    const storage = new GridFsStorage({ db: db, options: { useUnifiedTopology: true, useNewUrlParser: true}, file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err, buf) => {
                if (err) {
                    return reject(err);
                }
                let filename
                if (req.body && req.body.listingName) { // if listingName specified, treat as a listing name
                    filename = random_filename
                    fileInfo = {
                        filename: filename,
                        bucketName: 'fs',
                        metadata: `${req.body.price},${req.body.location}`
                    }
                } else {
                    filename = buf.toString('hex') + path.extname(file.originalname)
                    // console.log(filename.originalname)
                    // console.log(filename)
                    fileInfo = {
                        filename: filename,
                        bucketName: 'fs',
                    }
                }
                // const fileInfo = {
                //     filename: filename,
                //     bucketName: 'fs',
                // }
                if (req.body && req.body.email != '') { // if email attached to image upload (treated as profile picture)
                    const theUser = await db.collection('userinfo').findOne({ username: req.body.username })
                    const oldPfpName = theUser.userinfo.pfp
                    // if (oldPfpName) {
                    //     await deleteImg(oldPfpName)
                    // }
                    await db.collection('userinfo').updateOne({username: req.body.username}, {$set: {'userinfo.pfp': filename}})
                }
                
                resolve(fileInfo);
            })
        })
    }})
    // const upload = multer({ storage }).any('labelimg')
    const upload = multer({ storage }).any()
    upload(req, res, async function (err) {
        // console.log(req.body);
        if (err) {
            // This is a good practice when you want to handle your errors differently
            console.error(err);
            await client.close()
            res.send({ result: 201 })
            return
        }
        await client.close()
        // console.log(fileInfo);
        res.send({ result: 200, fileData:fileInfo })
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
        // console.log(result);
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
        // console.log(err);
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
    let userEmail = req.body.userEmail
    let userPassword = req.body.userPassword
    let userName = req.body.userName
    let first = req.body.first
    let last = req.body.last
    let bio = req.body.bio
    let number = req.body.number
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    try {
        let sameEmail = await collection.findOne({ email: userEmail })
        let sameUsername = await collection.findOne({ username: userName })
        if (sameEmail || sameUsername) {
            await client.close()
            res.send({ result: 201 })
            return
        }
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
        await client.close()
    }
    let userOb = {
        email: userEmail,
        username: userName,
        userinfo: {
            password: encryptString(userPassword),
            first: first,
            last: last,
            bio: bio,
            followers: [],
            following: [],
            pfp: '',
            phoneNumber: number,
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
        await client.close()
    }
})

//api for post
app.post('/api/addpost', async (req, res) => {
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('posts')

    // try {
    //     let sameID = await collection.findOne({ id: uniqueID })
    //     if (sameID) {
    //       //  await client.close()
    //         res.send({ result: 201 })
    //         return
    //     }
    // } catch (err) {
    //     console.error(err)
    //     res.send({ result: 201 })
    //     // await client.close()
    // }

    let postObject = {
    }

    let image_id_data = req.body.images[0]._id
    var Image_To_Push = mongodb.ObjectID
    var post_id = Image_To_Push(image_id_data)

    let image_data_array = []
    image_data_array.push(post_id)

    postObject['address'] = req.body.address;
    postObject['price'] = req.body.price;
    postObject['distance'] = req.body.distance
    postObject['rentByDate'] = req.body.rentByDate
    postObject['seller'] = req.body.seller
    postObject['amenities'] = req.body.amenities
    postObject['facilities'] = req.body.facilities
    postObject['bathrooms'] = req.body.bathrooms
    postObject['bedrooms'] = req.body.bedrooms
    postObject['images'] = image_data_array
    postObject['favorited'] = []

    try {
        await collection.insertOne(postObject)
        res.send({ status:200 })
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
    // console.log(fileName)
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
        await collection.updateOne({username: followee}, {$pull: {'userinfo.followers': follower}})
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
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
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
    // console.log(req.body)
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

app.post('/api/favoritepost', async (req, res) => {
    let username = req.body.username
    let post = req.body.postId
    var ObjectId = mongodb.ObjectID
    var post_id = ObjectId(post)

    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    const second_collection = db.collection('posts')
    try {
        let photo_id = await second_collection.findOne(post_id)
        await collection.updateOne({username: username}, {$push: {'userinfo.favoritedPosts': photo_id.images[0].toString()}})
        await second_collection.updateOne({_id: post_id}, {$push: {'favorited':username}})
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    }
    finally {
        await client.close()
    }
})

app.post('/api/unfavoritepost', async (req, res) => {
    let username = req.body.username
    let post = req.body.postId
    var ObjectId = mongodb.ObjectID
    var post_id = ObjectId(post)
    // rez = await collection.findOne(obj_id);

    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('userinfo')
    const second_collection = db.collection('posts')
    try {
        let photo_id = await second_collection.findOne(post_id)
        // console.log(photo_id.images[0])
        // return
        await collection.updateOne({username: username}, {$pull: {'userinfo.favoritedPosts': photo_id.images[0].toString()}})
        await second_collection.updateOne({_id: post_id}, {$pull: {'favorited':username}})
        res.send({ result: 200 })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    }
    finally {
        await client.close()
    }
})

app.get('/api/getallposts', async (req, res) => {
    await client.connect()
    const db = client.db('projectdb')
    const collection = db.collection('posts')
    try {
        let posts = await collection.find({}).toArray()
        res.send({ result: 200, posts: posts })
    } catch (err) {
        console.error(err)
        res.send({ result: 201 })
    } finally {
        await client.close()
    }
})

app.post('/api/getSinglePost', async (req, res) => {
    await client.connect()
    var ObjectId = mongodb.ObjectID
    var _id = ObjectId(req.body.id)

    var post_id = req.body.id
    const db = client.db('projectdb')
    const collection = db.collection('posts')
    try {
        let post = await collection.find( { _id:_id } ).toArray()
        // console.log(post)
        res.send( { result:200, post: post } )
    } catch (err) {
        console.log(err)
        res.send({ result: 201 })
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