require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { todoRouter } from "./routes/todo";

const cors = require('cors');
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING || "";

mongoose.connect(CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true},
    () => {
        console.log('connect to database')
    }
);

app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(todoRouter);

app.listen(PORT, () => {
    console.log('server is listening on port 3000');
});
