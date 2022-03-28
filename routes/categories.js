const express = require('express')
const router = express.Router()
const Categories = require('../models/categories')
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.use(cors())
router.use(express.json())

// endpoint -> /categories
router.get('/', authenticate, async (_, res) => {
  const categories = await Categories.find({})
  res.send(categories)
})

// endpoint -> /categories/new
router.post('/new', authenticate, async (req, res) => {
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

function authenticate (req, res, next) {
  const authorizationHeader = req.headers['authorization']
  const token = authorizationHeader && authorizationHeader.split(' ')[1]

  if (token == null || token == undefined) res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)

    req.user = user
    next()
  })
}

module.exports = router