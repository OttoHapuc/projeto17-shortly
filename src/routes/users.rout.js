import { Router } from "express";
import { validationToken } from "../autorization/validationToken.js";

const users = Router();

users.get('/users/me', validationToken,);
users.get('/ranking',);

export default users;