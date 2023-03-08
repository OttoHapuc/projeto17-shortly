import { Router } from 'express';
import { postSignIn, postSignUp } from '../controller/login.js';
import { validateSchema } from '../middleware/validationSchema.js';
import { signInSchema, signUpSchema } from '../schema/loginSchema.js';

const login = Router();

login.post('/signup', validateSchema(signUpSchema), postSignUp);
login.post('/signin', validateSchema(signInSchema), postSignIn);

export default login;