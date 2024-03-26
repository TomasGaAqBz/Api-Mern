const mongoose = require('mongoose')
const express = require('express')
const {config} = require('dotenv')
config()
const bookRoutes = require('./routes/book.routes.js')
const app = express()

const port = process.env.PORT || 3000


app.listen(port , () => {
    console.log("servidor iniciado");
})