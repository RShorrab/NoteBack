const joi = require('joi'); //validation (don't forget 'abortEarly: false')
const schema = joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    age: joi.number().min(18).max(60),
    email: joi.string().email({ minDomainSegments: 2, tlds: {allow: ['com', 'eg']} }).required(),
    password: joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)).required(),
    confirm_password: joi.ref('password')
})


const signupValidation = (req, res, next)=>
{
    const {name, age, email, password, confirm_password} = req.body
    let {error} = schema.validate({name, age, email, password, confirm_password}, {abortEarly: false})
    
    if(error)
    {
        res.json({error:  error.details.map( (error)=> error.message ) })
    }
    else
    {
        next()
    }
}

module.exports = signupValidation