const { noteModel } = require("../models/note.model")

const getUserNotes = async (req, res) =>
{
    const userId = req.header('userId')
    const notes = await noteModel.find({userId}).populate('userId', 'name -_id').select('title description -_id')
    res.json({notes})
}
const addNote = async (req, res) =>
{
    try
    {
        const {title, description} = req.body
        await noteModel.insertMany({title, description, userId: req.user._id})
        res.json({message: "Note added successfully"})
    }
    catch(error)
    {
        res.json({error: error})
    }
}
const updateNote = async (req, res) =>
{
    try
    {
        const {title, description, noteId} = req.body
        const Note = await noteModel.updateOne({_id: noteId}, {title, description})
        {Note.modifiedCount > 0? res.json({message: "Note updated"}): res.json({message: "No note found!"})}
    }
    catch(error)
    {
        res.json({error: error})
    }
}
const deleteNote = async (req, res)=>
{
    try
    {
        const {noteId} = req.body
        const Note = await noteModel.deleteOne({_id: noteId})
        {Note.deletedCount > 0? res.json({message: "Note deleted"}): res.json({message: "No note found!"})}
    }
    catch(error)
    {
        res.json({error: error})
    }
}


module.exports = 
{
    getUserNotes,
    addNote,
    updateNote,
    deleteNote
}