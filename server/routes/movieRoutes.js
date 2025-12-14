const express = require('express');
const router = express.Router();
const {
  getMovies,
  searchMovies,
  getSortedMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(getMovies).post(protect, admin, upload.single('poster'), addMovie);
router.route('/search').get(searchMovies);
router.route('/sorted').get(getSortedMovies);
router
  .route('/:id')
  .put(protect, admin, upload.single('poster'), updateMovie)
  .delete(protect, admin, deleteMovie);

module.exports = router;
