const express = require('express');
const{check}=  require('express-validator');
const MovieControllers = require('../controllers/Movie-controllers');

const router = express.Router();

router.get('/:mid',MovieControllers.getMoviesById);
router.get('/user/:uid',MovieControllers.getMoviesByUserID);
router.post('/',[
  check('movie_name').not().isEmpty(),
  check('rating').not().isEmpty(),
  check('year').not().isEmpty(),
  check('description').isLength({min: 5}),
  
],MovieControllers.createMovie);
router.patch('/:mid',[
   check('movie_name').not().isEmpty(),
   check('description').isLength({min: 5})
],MovieControllers.updatedMovie);

router.delete('/:mid',MovieControllers.deleteMovie);

module.exports = router;