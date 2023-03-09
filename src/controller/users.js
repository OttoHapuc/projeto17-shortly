import { dataBase } from "../config/dataBase.js";
import bcrypt from 'bcrypt';

export async function getUser(req, res) {
    const userExist = res.locals.userExist;
    try {
        const totalsVisited = await dataBase.query(`
        select SUM("urls".visitcount)
        from "urls" where iduser=$1
        `, [userExist.id]);
        const userUrls = await dataBase.query(`
        select *
        from "urls" where iduser = $1
        `, [userExist.id]);
        const userUrlsArray = userUrls.rows.map((row) => {
            return {
                id: row.id,
                shortUrl: row.shorturl,
                url: row.url,
                visitCount: row.visitcount
            }
        })
        return res.send({
            id: userExist.id,
            name: userExist.name,
            visitCount: totalsVisited.rows[0].sum || 0,
            shortenedUrls: userUrlsArray
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getRanking(req, res) {
    try {
        const visitCount = await dataBase.query(`
        select users.id, users.name, count("urls".id) as "linksCount", coalesce(sum("urls".visitcount),0) as "visitCount"
        from users 
        LEFT JOIN "urls" 
        ON "urls".iduser = users.id
        GROUP BY users.id
        order by "visitCount" DESC
        limit 10
        `)
        res.send(visitCount.rows)
    } catch (error) {
        res.status(500).send(error.message);
    }
}