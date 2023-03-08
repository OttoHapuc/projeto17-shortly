import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import users from './routes/users.js';
import url from './routes/urls.js';
import login from './routes/login.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use([users, url, login]);

app.listen(process.env.PORT || 5000, () =>
    console.log(`port: ${process.env.PORT}`)
);