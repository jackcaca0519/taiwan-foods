const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

//用戶註冊
router.route('/register')
    .get(users.registerPage)
    .post(catchAsync(users.registerUser))

//用戶登入
router.route('/login')
    .get(users.loginPage)
    .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), users.loginUser)

//用戶登出
router.get('/logout', users.logoutUser)



module.exports = router;