const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  profilePic: {
    type: String,
    trim: true
  }
}, {timestamps: true})

// static signup method
userSchema.statics.signup = async function (username, email, password) {

  // validation
  if (!email || !password || !username) {
    throw new Error('Please fill out all fields')
  }

  if (!validator.isEmail(email)) {
    throw new Error('Please enter a valid email')
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password must be at least 8 characters long, contain at least 1 lowercase, uppercase, number, and special character')
  }

  const usernameExists = await this.findOne({username})
  const emailExists = await this.findOne({email})

  if (emailExists) {
    throw new Error('Email already exists')
  }
  if (usernameExists) {
    throw new Error('Username already exists')
  }

  // salt and hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({username, email, password: hashedPassword})

  return user;
}

// static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw new Error('Please fill out all fields')
  }

  // find user by email or username
  const user = await this.findOne({$or: [{"email": email}, {"username": email}]})

  if (!user) {
    throw new Error('Invalid email/username or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid email/username or password')
  }

  return user;
}

module.exports = mongoose.model('User', userSchema);
