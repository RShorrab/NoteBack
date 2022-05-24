const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt') //hashing password
const jwt = require('jsonwebtoken'); //user token
const CryptoJS = require('crypto-js')


const signup = async (req, res)=>  
{
    //validation first
    const {name, age, phone, email, password} = req.body
    
    //if(password === confirm_password) {}   No need for that, as (confirm_password: joi.ref(password)) in validation means they must be the same.
    const user = await userModel.findOne({email})
    if(user)
    {
        res.json({message: 'email exist'})
    }
    else
    {
        //bcrypt.hash(password, Number(process.env.HashRounds), async function(error, hash){}  )    ..Done in userSchema.pre()
        try
        {
            await userModel.insertMany({name, age, phone, email, password})
            res.json({message: 'signup done'})
        }
        catch(error)
        {
            console.log(error);
            res.json({ message: 'catch error', error})
        }
    }  
}
const signin = async (req, res) =>
{
    const {email, password} = req.body
    try
    {
        const user = await userModel.findOne({email})
        if(user)
        {
            const match = await bcrypt.compare(password, user.password)
            if(match)
            {
                const token = jwt.sign({id: user._id, name: user.name, isLoggedIn: true}, process.env.tokenSignature, {expiresIn: 60})
                res.json({message: "signin Done", token})
            }
            else
            {
                res.json({message: 'wrong password please try again!'})
            }
        }
        else
        {
            res.json({message: `user doesn't exist`})
        }
    }
    catch(error)
    {
        res.json({error: error})
    }
}
const profile = async (req, res)=>
{
    try 
    {
        const user = await userModel.findById(req.user._id);
        user.phone = CryptoJS.AES.decrypt(user.phone, process.env.EncryptKey).toString(CryptoJS.enc.Utf8);  //decrypt transfers the 'cipher text' into plain text
        res.json({message: 'Done', user})
    } 
    catch (error) 
    {
        res.json({messahe: 'catch error', error})
    }
}
const getAllUsers = async (req, res) =>
{
    let page = req.body.page
    let pageLimit = 5
    if(page == undefined || page <=0)
    {
        page = 1
    }
    let skipUsers = (page-1) * pageLimit

    const users = await userModel.find().skip(skipUsers).limit(pageLimit);
    const count = await userModel.find().count()
    let pageNumber = count/5
    {pageNumber < 1? pageNumber=1 : pageNumber=pageNumber}

    console.log('page Number:', pageNumber);
    res.json({page, users})
}
const updateUser = async (req, res) =>
{
    try
    {
        const {name, age, email, password, userId} = req.body
        const user = await userModel.findByIdAndUpdate({_id: userId}, {name, age, email, password})
        {user? res.json({message: "user udpated"}): res.json({message: "No user found!"})}
    }
    catch(error)
    {
        res.json({error: error})
    }
}
const deleteUser = async (req, res) =>
{
    try
    {
        const {userId} = req.body
        const user = await userModel.findByIdAndDelete({_id: userId})
        {user? res.json({message: "user deleted"}): res.json({message: "No user found!"})}
    }
    catch(error)
    {
        res.json({error: error})
    }
}

module.exports = 
{
    signup,
    signin,
    profile,
    getAllUsers,
    updateUser,
    deleteUser
}