const express = require('express')
const RequiresExpertiseController = require('../controllers/RequiresExpertise')
const router = express.Router()

router.post('/requiresExpertise', RequiresExpertiseController.create)
router.delete('/requiresExpertise/:id', RequiresExpertiseController.delete)
router.get('/requiresExpertise/:id', RequiresExpertiseController.findById)

module.exports = router
