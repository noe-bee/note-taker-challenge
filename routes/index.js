const router = require('express').Router();
const notesRouter = require('./notes');

//add router.use to /notes route
router.use('/notes', notesRouter);


module.exports = router;