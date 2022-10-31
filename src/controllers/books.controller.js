const Book = require('../models/book')


const save = async (req, res, next) => {  
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
}

const getAll = async (req, res, next) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch(err) {
        next(err)
    }
}

const getById = async (req, res, next) => {
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
}

const update = async (req, res, next) => {
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
}

const remove = async (req, res, next) => {
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
}

module.exports = {
    save,
    getAll,
    getById,
    update,
    remove
}

