const express = require('express')
const FrameworkController = require('../controllers/Framework')
const router = express.Router()

router.post('/framework', FrameworkController.create)
router.get('/framework', FrameworkController.find)
router.get('/framework/:id', FrameworkController.findById)
router.patch('/framework/:id', FrameworkController.update)
router.delete('/framework/:id', FrameworkController.delete)

module.exports = router
