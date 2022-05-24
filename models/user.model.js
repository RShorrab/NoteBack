const mongoose = require('mongoose')
const bcrypt = require('bcrypt') //hashing password
const CryptoJS = require('crypto-js') //Encrypt/ Decrypt  .. encrypted texts must be type of Strings


const userSchema = mongoose.Schema({
    name: String,
    age: Number, 
    phone: String, //should be String to be encrypted
    email: {type: String, required: true, unique: true},
    password: String
}, {timestamps: true})

userSchema.pre('insertMany', async (next, docs)=>
{
    docs.password = await bcrypt.hash(docs.password, parseInt(process.env.HashRounds)) //lazm parseInt()
    docs.phone = CryptoJS.AES.encrypt(docs.phone, process.env.EncryptKey).toString();  //encrypt transfers the 'plain text' into cipher text
    next()
}) 
//search for 'Post' hook



const userModel = mongoose.model('user', userSchema)
module.exports = {userModel }