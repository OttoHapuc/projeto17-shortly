import { Router } from 'express';
import { validationToken } from '../autorization/validationToken.js';
import { deleteUrlId, getOpenUrlShort, getUrlId, postUrlShorten } from '../controller/urls.js';
import { validateSchema } from '../middleware/validationSchema.js';
import { urlSchema } from '../schema/urlSchema.js';


const url = Router();

url.post('/urls/shorten', validateSchema(urlSchema), validationToken, postUrlShorten);
url.get('/urls/:id', getUrlId);
url.delete('/urls/:id', validationToken, deleteUrlId);
url.get('/urls/open/:shortUrl',getOpenUrlShort);

export default url;