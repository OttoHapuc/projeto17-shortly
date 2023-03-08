import { dataBase } from "../config/dataBase.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function postSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const userExist = await dataBase.query(`
        select * from "users" where email=$1
        `, [email]);
        if (userExist.rowCount() > 0) return res.sendStatus(409);
        const hash = bcrypt.hashSync(password, 5);
        await dataBase.query(`
        insert into "users" (name, email, password)
        values ($1, $2, $3)
        `, [name, email, password]);
        res.status(201).send("OK");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function postSignIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await dataBase.query(`
        select * from "users" where email=$1
        `, [email]);
        if (!user.rows) return res.sendStatus(401);
        if (bcrypt.compareSync(password, user.rows[0].password)) {
            const token = uuid();
            await dataBase.query(`
            insert into "tokens" (token, userid)
            values ($1,$2)
            `, [token, user.rows[0].id]);
            return res.send({ token });
        };
        return res.sendStatus(401);
    } catch (error) {
        res.status(500).send(error.message);
    }
}