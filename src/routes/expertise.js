const express = require('express')
const ExpertiseController = require('../controllers/Expertise')
const router = express.Router()

router.post('/expertise', ExpertiseController.create)
router.get('/expertise', ExpertiseController.find)
router.get('/expertise/:id', ExpertiseController.findById)
router.patch('/expertise/:id', ExpertiseController.update)
router.delete('/expertise/:id', ExpertiseController.delete)

module.exports = router
