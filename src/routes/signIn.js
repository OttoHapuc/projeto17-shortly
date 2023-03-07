import { Router } from 'express';
import { postSignIn } from '../controller/login.js';
import { validateSchema } from '../middleware/validationSchema.js';
import { signInSchema } from '../schema/login.js';

const signIn = Router();

signIn.post('/signin', validateSchema(signInSchema), postSignIn);

export default signIn;