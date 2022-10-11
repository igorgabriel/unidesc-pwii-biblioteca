const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const port = 3000
const Book = require('./book')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('biblioteca-api is running')
})

app.post('/v1/books', async (req, res, next) => {  
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

app.get('/v1/books', async (req, res, next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch(err) {
        next(err)
    }
})

app.get('/v1/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id)
        if(!book) {
            throw new Error(`Book with id ${id} not found`)
        }
        res.status(200).json(book)
    } catch(err) {
        next(err)
    }
})

app.put('/v1/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = req.body

        const book = await Book.findById(id)
        if(!book) {
            throw new Error(`Book with id ${id} not found`)
        }

        const newBook = await Book.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json(newBook)
    } catch(err) {
        next(err)
    }
})

app.delete('/v1/books/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id)
        if(!book) {
            throw new Error(`Book with id ${id} not found`)
        }
        await Book.findByIdAndDelete(id)
        res.status(200).json({message: `Book with id ${id} has deleted`})
    } catch(err) {
        next(err)
    }
})

app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

app.listen(port, () => {
    console.log(`biblioteca-api running on port ${port}`)
})