"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const todo_1 = require("../models/todo");
const router = express_1.default.Router();
exports.todoRouter = router;
const pino = require('pino');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
router.get('/todos', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Execute GET');
    logger.debug('Requested page = %s', req.query.page);
    logger.debug('Requested limit = %s', req.query.limit);
    const todo = yield todo_1.Todo.find({});
    const todoPage = +(req.query.page || 0);
    const todoLimit = +(req.query.limit || 0);
    if (todoPage && todoLimit) {
        let start = (todoPage - 1) * todoLimit;
        let to = todoLimit * todoPage;
        logger.debug('Chunk start = %s', start);
        logger.debug('Chunk to = %s', to);
        let pageChunk = todo.slice(start, to);
        return res.status(200).send(pageChunk);
    }
    return res.status(200).send(todo);
}));
router.get('/todos/:id', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Execute GET');
    logger.debug('Requested id = %s', req.params.id);
    const todoId = { _id: req.params.id };
    try {
        const todo = yield todo_1.Todo.findById(todoId);
        return res.status(200).send(todo);
    }
    catch (error) {
        return res.status(404).send('');
    }
}));
router.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Execute POST');
    logger.debug('Requested body: %s', req.body);
    const { message, completed } = req.body;
    const todo = todo_1.Todo.build({ message, completed });
    yield todo.save();
    logger.info('A new todo item is created successfully');
    return res.status(201).send(todo);
}));
router.patch('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Execute PATCH');
    logger.debug('Requested body: %s', req.body);
    const { _id, message, completed } = req.body;
    const todoId = { _id: _id };
    try {
        let todo = yield todo_1.Todo.findByIdAndUpdate(todoId, { message: message, completed: completed });
        logger.info('The todo item is updated successfully');
        return res.status(200).send(todo);
    }
    catch (error) {
        return res.status(400).send('');
    }
}));
router.delete('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Execute DELETE');
    logger.debug('Requested body: %s', req.body);
    const { _id } = req.body;
    const todoId = { _id: _id };
    try {
        let todo = yield todo_1.Todo.findByIdAndDelete(todoId);
        if (!todo) {
            logger.info('No possible to delete todo item');
            return res.status(404).send('');
        }
        return res.status(204).send('');
    }
    catch (error) {
        return res.status(404).send('');
    }
}));
//# sourceMappingURL=todo.js.map