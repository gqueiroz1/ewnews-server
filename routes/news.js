const express = require('express')
const router = express.Router()
const News = require('../models/news')
const cors = require('cors')
router.use(cors())
router.use(express.json())

// endpoint -> /news
router.get('/', async (_, res) => {
  const news = await News.find({})
  res.send(news)
})

// endpoint -> /news/new
router.post('/new', async (req, res) => {
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


module.exports = router