const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./src/utils/db')
const bookRouter = require('./src/routes/books.route')
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('biblioteca-api is running')
})

// Book Routes
app.use('/api/v1/books', bookRouter)

app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

app.listen(port, () => {
    console.log(`biblioteca-api running on port ${port}`)
})