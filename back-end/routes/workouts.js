const express = require('express');
const Workout = require('../models/WorkoutModels');

const router = express.Router();

// this is to get all workouts
router.get('/', (req, res) => {
    res.json({msg: 'Get all workouts'});
});

// this is to get a single workout
router.get('/:id', (req, res) => {
    res.json({msg: 'Get a single workout'});
});

// this is to create a workout
router.post('/', async (req, res) => {
    const {title, repetitions, sets, weight} = req.body;

    try {
        const workout = await Workout.create({
            title,
            repetitions,
            sets,
            weight
        })
        res.status(200).json(workout);
        workout.save();
    }
    catch (err) {
        res.status(400).json({msg: err.message});
    }
});

// this is to delete a workout
router.delete('/:id', (req, res) => {
    res.json({msg: 'Delete a workout'});
});

// this is to update a workout
router.patch('/:id', (req, res) => {
    res.json({msg: 'Update a workout'});
});


module.exports = router;