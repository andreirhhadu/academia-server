const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const port = 5000

app.use(cors())

app.use(bodyParser.json())

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://andreiradu:jA0bOl8Ye0DprKHf@serverlessinstance0.pqyasyd.mongodb.net/?retryWrites=true&w=majority")
    console.log("Connected to Mongodb")
  } catch (e) {
    console.log(e)
  }
}

connect()

const NoteSchema = new mongoose.Schema({ title: String, content: String, author: String, createdAt: Date })
const NoteModel = mongoose.model('notes', NoteSchema)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/notes/add-note', async (req, res) => {
  const { title, content, author } = req.body

  if ( !title || !content || !author ) {
    res.status(500).send("Eroare: titlu, content sau author lipsa.")
  }

  const newDocument = new NoteModel({ title, content, author, createdAt: new Date() })

  try {
    var result = await newDocument.save()
    res.status(200).send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/notes/get-notes', async (req, res) => {
  try {
    var result = await NoteModel.find({})
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})