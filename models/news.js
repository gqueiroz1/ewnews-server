const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('News', newsSchema)