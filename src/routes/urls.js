import { Router } from 'express';
import { validationToken } from '../autorization/validationToken';
import { postUrlShorten } from '../controller/urls';
import { validateSchema } from '../middleware/validationSchema';
import { urlSchema } from '../schema/urlSchema';


const url = Router();

url.post('/urls/shorten', validateSchema(urlSchema), validationToken, postUrlShorten);
url.get('/urls/:id',);
url.delete('/urls/:id', validationToken,);
url.get('/urls/open/:shortUrl',);

export default url;