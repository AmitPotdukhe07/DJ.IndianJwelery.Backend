import express from 'express';
import { signUp, signIn } from '../controllers/user.controller.js';
import { userAuth } from './middleware/auth.middleware.js';
import { emailValidationRules, validate } from '../utils/validate.js';
const userRouter = express.Router();

userRouter.post("/user/signup", emailValidationRules, validate, signUp)
userRouter.post("/user/signin", signIn)

export default userRouter