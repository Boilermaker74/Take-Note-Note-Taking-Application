const router = require('express').Router();
const notesRouter = require("./api/notes.js")
router.use('/notes', notesRouter);

module.exports = router;