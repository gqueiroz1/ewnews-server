const express = require('express')
const router = express.Router()
const Categories = require('../models/categories')
const cors = require('cors')
router.use(cors())
router.use(express.json())

// endpoint -> /categories
router.get('/', async (_, res) => {
  const categories = await Categories.find({})
  res.send(categories)
})

// endpoint -> /categories/new
router.post('/new', async (req, res) => {
  const category = new Categories({
    ...req.body
  })
  
  try {
    await category.save()
    res.json({
      data: { ...req.body },
    })
  } catch (e) {
    res.status(400)
    res.send({
      message: 'Failed to register',
      error: e
    })
  }
})


module.exports = router