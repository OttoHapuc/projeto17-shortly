import { Router } from 'express';
import { validationToken } from '../autorization/validationToken';
import { deleteUrlId, getOpenUrlShort, getUrlId, postUrlShorten } from '../controller/urls';
import { validateSchema } from '../middleware/validationSchema';
import { urlSchema } from '../schema/urlSchema';


const url = Router();

url.post('/urls/shorten', validateSchema(urlSchema), validationToken, postUrlShorten);
url.get('/urls/:id', getUrlId);
url.delete('/urls/:id', validationToken, deleteUrlId);
url.get('/urls/open/:shortUrl',getOpenUrlShort);

export default url;