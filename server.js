const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1984

let db,
    dbConnectionString = 'mongodb+srv://crud3:crud3@cluster0.fsxku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName = 'healthDB'

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName}`)
        db = client.db(dbName)
    })
    .catch(err =>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.post('/createEntry', (req, res) => {
    db.collection('healthCollection').insertOne({
        anxEntry: req.body.entryAnxItem,
        depEntry: req.body.entryDepItem,
        textEntry: req.body.entryText,
        dateEntry: req.body.entryDate,
    })
    .then(result => {
        console.log(`Entry has been added for ${req.body.entryDate}`)
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
})

app.get('/', (req, res) => {
    db.collection('healthCollection').find().toArray()
    .then(data => {
        res.render('index.ejs', {bigEntryDataArray: data})
    })
})

app.listen(PORT, ()=> {
    console.log('Server esta corriendo, mijo.')
})