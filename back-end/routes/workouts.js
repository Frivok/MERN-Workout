const express = require('express');
const {
  getAWorkout,
  getUserWorkouts,
  getAllWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutControllers');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// this is to get all workouts
router.get('/', getAllWorkouts);

// this is to get the user's workouts
router.get('/profile', getUserWorkouts);

// this is to get a single workout
router.get('/:id', getAWorkout);

// this is to create a workout
router.post('/', createWorkout);

// this is to delete a workout
router.delete('/:id', deleteWorkout);

// this is to update a workout
router.patch('/:id', updateWorkout);


module.exports = router;