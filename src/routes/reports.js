const express = require('express')
const ReportsController = require('../controllers/Reports')
const router = express.Router()

router.get('/person/:id/getTeammates', ReportsController.getTeammates)

module.exports = router
