"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const todo_1 = require("./routes/todo");
const cors = require('cors');
const app = express_1.default();
const morgan = require('morgan');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });
const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb+srv://root:root@cluster0.qsnev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
app.use(expressLogger);
mongoose_1.default.connect(CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connect to database');
});
app.use(morgan('tiny'));
app.use(cors());
app.use(body_parser_1.json());
app.use(todo_1.todoRouter);
app.listen(PORT, () => {
    logger.info('Server is listening on port %d', PORT);
});
//# sourceMappingURL=index.js.map