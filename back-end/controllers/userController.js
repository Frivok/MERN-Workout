const User = require('../models/userModels');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({dest: 'images/'});
const fs = require('fs');
var path = require('path');

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// login user 
const loginUser = async (req, res) => {

  const {email, password} = req.body;

  let emptyFields = [];
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all fields", emptyFields});
  }

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

// signup user
const signupUser = async (req, res) => {

  const {username, email, password} = req.body;

  let emptyFields = [];
  if (!username) emptyFields.push("username");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all fields", emptyFields});
  }

  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({email, token})

  } catch (err) {
    res.status(400).json({error: err.message})
  }
}

const uploadPp = async (req, res, err) => {

  // get the file type and add it to the filename
  let fileType = req.file.mimetype.split('/')[1];
  let newFileName = req.file.filename + '.' + fileType;
  console.log("newFileName: " + newFileName);
  // move the file to the images folder
  fs.rename(req.file.path, 'images/' + newFileName, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File uploaded");
  });

  // update the user's profile picture to the database
  let user = await User.findOne({_id: req.user._id});
  user.profilePic = newFileName;
  await user.save();

  res.send('File uploaded');
}

const deletePp = async (req, res) => {

  // delete the user's profile picture from the database
  let user = await User.findOne({_id: req.user._id});
  user.profilePic = null;
  await user.save();

  res.send('File deleted');

}
const showProfilePicture = async (req, res) => {

  let user = await User.findOne({_id: req.user._id});
  res.sendFile(path.join(__dirname, '../images', user.profilePic || 'default_pp.png'));
}

const profileUser = async (req, res) => {
  res.status(200).json(req.user);
  console.log("profile")
}


module.exports = {loginUser, signupUser, uploadPp, deletePp, showProfilePicture, profileUser}