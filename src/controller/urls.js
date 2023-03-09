import { nanoid } from "nanoid";
import { dataBase } from "../config/dataBase.js";

export async function postUrlShorten(req, res) {
    const { url } = req.body;
    const { id } = res.locals.userExist;
    console.log( res.locals.userExist)
    const shortenUrl = nanoid(12);
    try {
        const short = await dataBase.query(`
        insert into "urls" (url, shorturl, iduser)
        values ($1, $2, $3)
        returning id
        `, [url, shortenUrl, id]);
        return res.status(201).send({
            shortenUrl: shortenUrl,
            id: short.rows[0].id
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getUrlId(req, res) {
    const {id} = req.params;
    try {
        const url = await dataBase.query(`
        select * from "urls" where id =$1
        `, [id]);
        if(url.rowCount === 0) return res.sendStatus(404);
        return res.send({
            id: url.rows[0].id,
            url: url.rows[0].url,
            shortUrl: url.rows[0].shorturl
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteUrlId(req, res) {
    const {id} = req.params;
    const userExists = res.locals.userExist;
    try {
        const url = await dataBase.query(`
        select * from "urls" where id =$1
        `, [id]);
        if(url.rowCount === 0) return res.sendStatus(404);
        if(url.rows[0].iduser !== userExists.id) return res.sendStatus(401);
        await dataBase.query(`
        delete from "urls" where id=$1
        `,[id]);
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function getOpenUrlShort(req, res) {
    const {shortUrl} = req.params;
    try {
        const url = await dataBase.query(`
        select * from "urls" where shorturl =$1
        `, [shortUrl]);
        if(url.rowCount === 0) return res.sendStatus(404);
        await dataBase.query(`
        update "urls" set visitcount = visitcount + 1
        where id = $1
        `,[url.rows[0].id]);
        return res.redirect(url.rows[0].url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}