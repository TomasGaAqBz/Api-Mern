const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


const Book = require('../models/book.model')

//MIDDLEWARE

const getBook = async (req, res, next) => {
    let book
    const { id } = req.params

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json(
            {
                message: 'El id del libro no es valido'
            }
        )
    }
    try {
        book = await Book.findById(id)
        if(!book){
            return res.status(404).json(
                {
                    message: 'El libro no fue encontrado'
                }
            )
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.book = book
    next()
}



// obtener todos los libros  [GET ALL]
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        console.log('Get ALL ', books);
        if (books.length === 0) {
            return res.status(204).json([])
        }
        return res(books)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})



//crear un nuevo libro (recurso) [ POST ]


router.post('/', async (req, res) => {
    const { title, author, gender, publication_date } = req?.body
    if (!title || !author || !gender || !publication_date) {
        return res.status(400).json({
            message: 'Faltan campos a completar'
        })
    }
    const book = new Book(
        {
            title,
            author,
            gender,
            publication_date
        }
    )
    try {
        const newBook = await book.save()
        console.log(newBook);
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

    
})

module.exports = router