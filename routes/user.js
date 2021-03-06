const express = require('express')
const router = express.Router()
const User = require('../models/user')
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.use(cors())
router.use(express.json())

router.post('/new', async (req, res) => {
  const user = new User({
    ...req.body.body
  })

  try {
    await user.save()
    res.json({
      data: { ...req.body.body },
    })
  } catch (e) {
    res.status(400)
    res.send({
      message: 'Falha ao registrar'
    })
  }
})

router.post('/login', async (req, res) =>  {
  try { 
    const [user] = await User.find({email: req.body.body.email})
    
    if (!Object.keys(user).length || user.password !== req.body.body.password) {
      res.status(404)
      res.send()
      return
    }

    const accessToken = jwt.sign({ ...user }, process.env.ACCESS_TOKEN_SECRET)

    return res.send({
      user: {
        email: user.email,
        fullName: user.fullName
      },
      token: accessToken
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router