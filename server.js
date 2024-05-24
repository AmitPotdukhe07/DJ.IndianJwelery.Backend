import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import cors from 'cors';
import startDB from './src/config/db.js';
const app = express();
startDB();

import routes from './src/routes.js';

app.use(json());
app.use(cors());
app.use("/api/v1", routes)
app.listen(process.env.PORT, () => {
    console.log(`Service is running on ${process.env.PORT} port.`);
})
