const express = require('express');
const {getAWorkout, getAllWorkouts , createWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutControllers');

const router = express.Router();

// this is to get all workouts
router.get('/', getAllWorkouts);

// this is to get a single workout
router.get('/:id', getAWorkout);

// this is to create a workout
router.post('/', createWorkout);

// this is to delete a workout
router.delete('/:id', deleteWorkout);

// this is to update a workout
router.patch('/:id', updateWorkout);

module.exports = router;