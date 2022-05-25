require('dotenv').config({path: './config/.env'})
const express = require('express')
const app = express()
const port = process.env.PORT
const userRouter = require('./api/user.route')
const noteRouter = require('./api/note.route')
const {dbconnection} = require('./config/dbconn')

app.use(express.json())
app.use(userRouter)
app.use(noteRouter)
app.get('*', (req, res) => res.send('Hello World!'))

dbconnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))