import { dataBase } from "../config/dataBase.js";

export async function validationToken(req, res, next) {
    const autorization = req.headers.autorization;
    const token = autorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);
    try {
        const activeUser = await dataBase.query(`
        select * from "tokens" where token=$1
        `, [token]);
        if (!activeUser.rows) return res.sendStatus(401);
        const userExist = await dataBase.query(`
        select * from users where id=$1
        `, [activeUser.rows[0].userid]);
        if (!userExist.rows) return res.sendStatus(401);
        res.locals.userExist = userExist.rows[0];
        next();
    } catch (error) {
        res.status(500)
    }
}