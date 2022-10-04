const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const port = 3000

app.use(bodyParser.json())

app.post('/v1/books', async (req, res, next) => {
    const Book = require('./book')
    try {
        const data = req.body
        const newBook = new Book(data)
        const savedBook = await newBook.save()
        if(!savedBook) {
            throw new Error('Book cold not be saved')
        }
        res.status(201).json({
            message: 'New book created'
        })
        
    } catch(err) {
        next(err)
    }

})

app.get('/', (req, res) => {
    res.send('biblioteca-api is running')
})

app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

app.listen(port, () => {
    console.log(`biblioteca-api running on port ${port}`)
})