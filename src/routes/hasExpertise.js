const express = require('express')
const HasExpertiseController = require('../controllers/HasExpertise')
const router = express.Router()

router.post('/hasExpertise', HasExpertiseController.create)
router.delete('/hasExpertise/:id', HasExpertiseController.delete)
router.get('/hasExpertise/:id', HasExpertiseController.findById)

module.exports = router
