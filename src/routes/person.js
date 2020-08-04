const express = require('express')
const PersonController = require('../controllers/Person')
const router = express.Router()

router.post('/person', PersonController.create)
router.get('/person', PersonController.find)
router.get('/person/:id', PersonController.findById)
router.patch('/person/:id', PersonController.update)
router.delete('/person/:id', PersonController.delete)

module.exports = router
