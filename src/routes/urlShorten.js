import { Router } from 'express';
import { validationToken } from '../autorization/validationToken';
import { postUrlShorten } from '../controller/urlShorten';
import { validateSchema } from '../middleware/validationSchema';
import { urlSchema } from '../schema/urlSchema';


const signUp = Router();

validationToken

signUp.get('/urls/shorten', validateSchema(urlSchema), postUrlShorten);

export default signUp;