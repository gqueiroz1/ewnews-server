const express = require('express')
const router = express.Router()
const News = require('../models/news')
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.use(cors())
router.use(express.json())

// endpoint -> /news
router.get('/', authenticate, async (req, res) => {
  console.log(req.user)
  let news

  try {
    if (req.query.title) {
      news = await News.find({ title: { $regex: req.query.title, $options: 'i' } })
    } else {
      news = await News.find({})
    }
  } catch (e) {
    console.log(e)
  }

  res.send(news)
})

// endpoint -> /news/new
router.post('/new', authenticate, async (req, res) => {
  const news = new News({
    ...req.body,
    createdAt: Date.now()
  })
  
  try {
    await news.save()
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