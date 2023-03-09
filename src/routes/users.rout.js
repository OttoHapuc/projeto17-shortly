import { Router } from "express";
import { validationToken } from "../autorization/validationToken.js";
import { getRanking, getUser } from "../controller/users.js";

const users = Router();

users.get('/users/me', validationToken, getUser);
users.get('/ranking', getRanking);

export default users;