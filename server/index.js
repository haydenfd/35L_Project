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
// app.use(express.urlencoded({ extended: true }))
// app.use(express.bodyParser())

client.connect(err => {
    if (err) throw err
    console.log("db connected");
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

app.post('/uploadimg', (req, res) => {
    console.log("received");
    res.render("HI")
})

app.post('/api/test', (req, res) => {
    res.send({ express: "APP IS CONNECTED" })
    console.log(req.body);
})