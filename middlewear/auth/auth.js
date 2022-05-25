const jwt = require("jsonwebtoken")
const { userModel } = require("../../models/user.model")

const auth = ()=>
{
    return async (req,res, next)=>
    {
        try
        {
            const headerToken = req.headers['authorization'] //must be 'authorization' to access the Bearer Token in Authorization 
            if(!headerToken || headerToken == undefined || headerToken == null || headerToken.length == 0 || !headerToken.startsWith(`${process.env.Bearer} `) )
            {
                res.json({message: "invalid header token"})
            } 
            else
            {
                console.log(headerToken);
                const originalToken = headerToken.split(' ')[1]
                try 
                {
                    const decodedToken = jwt.verify(originalToken, process.env.tokenSignature)  // jwt.verify(token, tokenSignature, (error, decoded)=> {} )
                    const user = await userModel.findById(decodedToken.id).select('name email')
                    if(!user)
                    {
                        res.json({message: "invalid login user"})
                    }
                    else
                    {  
                        req.user = user
                        next()
                    }
                } 
                catch (error) 
                {
                    res.json({error})
                }
            }
        }
        catch(error)
        {
            res.json({error})
        }
    }
}

module.exports = auth