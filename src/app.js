import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import users from './routes/users.rout.js';
import url from './routes/urls.rout.js';
import login from './routes/login.rout.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([users, url, login]);

app.listen(process.env.PORT || 5000, () =>
    console.log(`port: ${process.env.PORT}`)
);