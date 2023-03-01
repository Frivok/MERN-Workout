const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

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
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFields});
    }

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

// signup user
const signupUser = async (req, res) => {

    const{username, email, password} = req.body;
    
    let emptyFields = [];
    if (!username) emptyFields.push("username");
    if (!email) emptyFields.push("email");
    if (!password) emptyFields.push("password");
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all fields", emptyFields});
    }

    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token})

    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


module.exports = { loginUser, signupUser }