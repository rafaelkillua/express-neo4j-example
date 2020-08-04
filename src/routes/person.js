const express = require('express')
const PersonController = require('../controllers/Person')
const router = express.Router()

router.post('/person', PersonController.create)

module.exports = router
