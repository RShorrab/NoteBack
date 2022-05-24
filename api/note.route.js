const noteRouter = require('express').Router()
const { getUserNotes, addNote, updateNote, deleteNote } = require('../services/note.services');
const auth = require('../middlewear/auth/auth');

noteRouter.get('/getUserNotes', getUserNotes)
noteRouter.post('/addNote', auth(), addNote)
noteRouter.put('/updateNote', updateNote)
noteRouter.delete('/deleteNote', deleteNote)

module.exports = noteRouter;