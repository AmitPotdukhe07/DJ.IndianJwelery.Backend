import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import startDB from './src/config/db.js';
const app = express();
startDB();

app.use(json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Service is running on ${process.env.PORT} port.`);
})
