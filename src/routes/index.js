const express = require('express')
const router = express.Router()

router.get('/', (_, res) => {
  res.status(200).send('Online')
})

module.exports = router
