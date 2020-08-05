const express = require('express')
const ReportsController = require('../controllers/Reports')
const router = express.Router()

router.get('/person/:id/getTeammates', ReportsController.getTeammates)
router.get('/expertise/:id/who', ReportsController.getWhoHasExpertise)

module.exports = router
