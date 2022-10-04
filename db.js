const mongoose = require('mongoose')
const mongodbUrl = 'mongodb://localhost/biblioteca?authSource=admin'

mongoose.connect(mongodbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: 'biblioteca',
    pass: '123456'
})

const db = mongoose.connection

db.on('error', (err) => console.error(`Error: ${err}`))
db.on('connected', (err, res) => console.log('Connected to database'))