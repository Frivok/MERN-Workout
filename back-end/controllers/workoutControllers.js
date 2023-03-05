const Workout = require('../models/WorkoutModels');
const mongoose = require('mongoose');

//get all workouts
const getAllWorkouts = async (req, res) => {

  // find all workouts in database and sort by descending order
  const workouts = await Workout.find();
  // send workouts as response to user
  res.status(200).json(workouts);
}

const getUserWorkouts = async (req, res) => {

  const user_id = req.user._id;
  // find all workouts in database and sort by descending order
  const workouts = await Workout.find({user_id}).sort({createdAt: -1});
  // send workouts as response to user
  res.status(200).json(workouts);
}

//get a single workout
const getAWorkout = async (req, res) => {

  // get id from url
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No workout with this id" + id});
  }

  const workout = await Workout.findById(id);

  // if no workout with id, send 404 status and message
  if (!workout) {
    return res.status(404).json({msg: "No workout with id: " + id});
  }

  res.status(200).json(workout);
}

//create a workout
const createWorkout = async (req, res) => {
  const {title, repetitions, sets, weight} = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!repetitions) emptyFields.push("repetitions");
  if (!sets) emptyFields.push("sets");
  if (!weight) emptyFields.push("weight");

  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all fields", emptyFields});
  }

  // add schema to database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      repetitions,
      sets,
      weight,
      user_id
    })
    //workout.save()
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({error: err.message});
    console.log(err);
  }
}

//delete a workout
const deleteWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No workout with this id" + id});
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  // if no workout with id, send 404 status and message
  if (!workout) {
    return res.status(404).json({msg: "No workout with id: " + id});
  }

  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No workout with this id" + id});
  }

  // find workout by id and update
  const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body}, {new: true});

  // if no workout with id, send 400 status and message
  if (!workout) {
    return res.status(400).json({msg: "No workout with id: " + id});
  }

  res.status(200).json(workout);
}

module.exports = {
  getAllWorkouts,
  getUserWorkouts,
  getAWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}