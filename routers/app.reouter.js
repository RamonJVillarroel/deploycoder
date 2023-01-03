const express = require('express');
const apiRoutes = require('./api/api.routes');
const auth = require('../middlewares/auth');

const router = express.Router();

//Routes
router.use('/api', apiRoutes);

router.get('/', async(req, res) => {
  res.sendFile('login.html', {root: 'public'})
})

router.get('/login', async(req, res) => {
  res.sendFile('login.html', {root: 'public'})
})//! ESTE GET ES REITERATIVO CON EL HOME, VER DESPUES SI SE DEJA O NO!

router.get('/register', async(req, res) => {
  res.sendFile('registro.html', {root: 'public'})
})
router.get('/profile', auth, async (req, res) => {
  const user = req.user;
  res.render('profile.ejs', { username: user.firstname });
});
router.post('/loginError', async(req,res)=>{
 res.render('error.ejs')
})

router.get('/logout', auth, (req, res, next) => {
  req.logOut(() => {
    res.redirect('/');
  })
})


module.exports = router;