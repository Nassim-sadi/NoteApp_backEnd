const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const Note = require('../models/Note');
// @desc Note page
//@route GET /notes
router.get('/add', ensureAuth, (req, res) => {
  res.render('notes/add');
});
// @desc Process Add form
//@route POST /notes
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('error/500');
  }
});

module.exports = router;
