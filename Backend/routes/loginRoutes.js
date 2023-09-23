const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController')
const passport = require('passport');

function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

router.post('/login',loginController.login)

router.get('/google',passport.authenticate('google' ,{scope:['profile','email']}));

router.get('/googlelogin',
    passport.authenticate('google',{
        successRedirect:'/newaccount',
        failureRedirect:'/efweh',
    })
)

router.get('/newaccount',isLoggedIn,loginController.googleLogin)

module.exports =  router;