const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth'); in case of a release containing an update profile

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); //subscribe to webfactory
router.post('/login', userCtrl.login); //log to session

module.exports = router;