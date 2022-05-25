require('dotenv').config({path: './config/.env'})
var cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT
const userRouter = require('./api/user.route')
const noteRouter = require('./api/note.route')
const {dbconnection} = require('./config/dbconn')

app.use(express.json())
app.use(cors())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/notes', noteRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.get('*', (req, res) => res.send('Hello World!'))

dbconnection()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))