const express = require('express');

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
router.post('/', (req, res) => {
    res.json({msg: 'Create a workout'});
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