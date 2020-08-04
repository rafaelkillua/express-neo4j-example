const express = require('express')
const PersonController = require('../controllers/Person')
const router = express.Router()

router.post('/person', PersonController.create)
router.get('/person', PersonController.find)
router.get('/person/:id', PersonController.findById)

module.exports = router
