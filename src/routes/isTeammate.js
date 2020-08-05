const express = require('express')
const IsTeammateController = require('../controllers/isTeammate')
const router = express.Router()

router.post('/teammate', IsTeammateController.create)
router.delete('/teammate/:id', IsTeammateController.delete)
router.get('/teammate/:id', IsTeammateController.findById)

module.exports = router
