const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const user = new User({
    name: 'Jéssica'
  })

  try {
    const newUser = await user.save()
    res.send(newUser)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router