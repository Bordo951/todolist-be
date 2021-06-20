import express, {Request, Response} from 'express';
import {Todo} from '../models/todo';

const router = express.Router();
const pino = require('pino');

const logger = pino({level: process.env.LOG_LEVEL || 'info'});

router.get('/todos', [], async (req: Request, res: Response) => {
    logger.info('Execute GET');
    logger.debug('Requested page = %s', req.query.page);
    logger.debug('Requested limit = %s', req.query.limit);

    const todo = await Todo.find({});
    const todoPage: number = +(req.query.page || 0);
    const todoLimit: number = +(req.query.limit || 0);

    if (todoPage && todoLimit) {
        let start = (todoPage - 1) * todoLimit;
        let to = todoLimit * todoPage;

        logger.debug('Chunk start = %s', start);
        logger.debug('Chunk to = %s', to);

        let pageChunk = todo.slice(start, to);

        return res.status(200).send(pageChunk);
    }

    return res.status(200).send(todo);
});

router.get('/todos/:id', [], async (req: Request, res: Response) => {
    logger.info('Execute GET');
    logger.debug('Requested id = %s', req.params.id);

    const todoId = {_id: req.params.id};

    try {
        const todo = await Todo.findById(todoId);

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(404).send('');
    }
});

router.post('/todos', async (req, res) => {
    logger.info('Execute POST');
    logger.debug('Requested body: %s', req.body);

    const {message, completed} = req.body;
    const todo = Todo.build({message, completed});

    await todo.save();
    logger.info('A new todo item is created successfully');

    return res.status(201).send(todo);
});

router.patch('/todos', async (req, res) => {
    logger.info('Execute PATCH');
    logger.debug('Requested body: %s', req.body);

    const {_id, message, completed} = req.body;
    const todoId = {_id: _id};

    try {
        let todo = await Todo.findByIdAndUpdate(todoId, {message: message, completed: completed});
        logger.info('The todo item is updated successfully');

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(400).send('');
    }
});

router.delete('/todos', async (req, res) => {
    logger.info('Execute DELETE');
    logger.debug('Requested body: %s', req.body);

    const {_id} = req.body;
    const todoId = {_id: _id};

    try {
        let todo = await Todo.findByIdAndDelete(todoId);

        if (!todo) {
            logger.info('No possible to delete todo item');

            return res.status(404).send('');
        }

        return res.status(204).send('');
    } catch (error) {
        return res.status(404).send('');
    }
});

export {router as todoRouter};
