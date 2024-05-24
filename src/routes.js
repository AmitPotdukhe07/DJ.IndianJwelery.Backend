import express from 'express';
import { signUp, signIn } from './controller/user.controller.js';
import { userAuth } from './middleware/auth.middleware.js';
import { createCompanyData, search } from './controller/company.controller.js';
// import { emailValidationRules, validate } from '../utils/validate.js';
const routes = express.Router();

routes.post("/user/signup", signUp)
routes.post("/user/signin", signIn)

routes.post("/company", createCompanyData);
routes.get("/search", search)

export default routes