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
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'fs'
                };
                // store filename somewhere relating to user pfp so file can be retrieved later
                resolve(fileInfo);
            })
        })
    }})
    const upload = multer({ storage }).single('labelimg')
    upload(req, res, async function (err) {
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