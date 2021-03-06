import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import 'express-async-errors';
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {console.log("Server is running in http://localhost:3333")});
