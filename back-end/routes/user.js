const express = require('express');
const router = express.Router();

// controllers 
const {signupUser, loginUser, uploadPp,deletePp, showProfilePicture, profileUser} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');
const upload = multer({dest: 'images/'});

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// upload profile picture
router.post('/uploadFile', requireAuth, upload.single('file'), uploadPp)

// show profile picture
router.get('/profilePic', requireAuth, showProfilePicture)

// show user profile
router.post('profile' , requireAuth, profileUser)

// delete profile picture
router.delete('/profilePic', requireAuth, deletePp)

module.exports = router;