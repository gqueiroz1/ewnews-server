const express = require('express')
const router = express.Router()
const News = require('../models/news')
const cors = require('cors')
router.use(cors())
router.use(express.json())

// endpoint -> /news
router.get('/', async (req, res) => {
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