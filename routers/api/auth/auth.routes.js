const express = require('express');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post('/register',
    passport.authenticate('signup',
        {
            failureRedirect: '/signupError',//ruta para errores
            successRedirect: '/profile'
        }
    ));
router.post('/login',

    passport.authenticate('signin',

        {
            failureRedirect: '/loginError',
            successRedirect: '/profile'
        })


);
module.exports = router;