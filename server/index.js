import dotenv from 'dotenv'
import cors from 'cors';
import mongodb from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'

dotenv.config()

const MongoClient = mongodb.MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
    sslKey: process.env.CRED_PATH,
    sslCert: process.env.CRED_PATH
},
{ useUnifiedTopology: true }, { useNewUrlParser: true })
const PORT = process.env.PORT || 8000

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.bodyParser()) // deprecated

client.connect(err => {
    if (err) throw err
    console.log("db connected");
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.post('/uploadimg', (req, res) => {
    console.log("received");
    //WIP
})

app.post('/api/test', (req, res) => {
    res.send({ express: "APP IS CONNECTED" })
    console.log(req.body);
    let data = { myData: req.body.MYDATA }
    client.db('projectdb').collection('userinfo').insertOne(data, (err, res) => {
        if (err) throw err
    })
})