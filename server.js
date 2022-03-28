if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()

app.listen(process.env.PORT || 3000)
// app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Mongoose is successfully connected'))

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

