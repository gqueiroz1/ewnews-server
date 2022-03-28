const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const categoriesRouter = require('./categories')
const newsRouter = require('./news')

router.use('/user', userRouter)
router.use('/categories', categoriesRouter)
router.use('/news', newsRouter)

module.exports = router