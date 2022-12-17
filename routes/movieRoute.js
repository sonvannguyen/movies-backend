const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.post('/create', movieController.createNewMovie)
router.get('/search', movieController.searchMovieByName)



module.exports = router