import { Router } from "express";
import { validationToken } from "../autorization/validationToken";

const users = Router();

users.get('/users/me', validationToken,);
users.get('/ranking',);

export default users;