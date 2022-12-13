const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.post('/create', movieController.createNewMovie)

module.exports = router