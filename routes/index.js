const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    name: 'Guilherme'
  })
})

module.exports = router