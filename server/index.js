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
    } catch (err) {
        console.error(err)
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