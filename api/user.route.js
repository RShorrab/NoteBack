const userRouter = require('express').Router()
const { signin, signup, getAllUsers, updateUser, deleteUser, profile } = require('../services/user.services');
const signupValidation = require('../middlewear/validation/signup.validation');
const auth = require('../middlewear/auth/auth')


userRouter.get('/', getAllUsers)
userRouter.get('/profile', auth(), profile)
userRouter.post('/signup', signupValidation, signup)
userRouter.post('/signin', signin)
userRouter.put('/updateUser', updateUser)
userRouter.delete('/deleteUser', deleteUser)


module.exports = userRouter;