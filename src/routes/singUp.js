import { Router } from 'express';
import { postSignUp } from '../controller/login.js';
import { validateSchema } from '../middleware/validationSchema.js';
import { signUpSchema } from '../schema/login.js';

const signUp = Router();

signUp.get('/signup', validateSchema(signUpSchema), postSignUp);

export default signUp;