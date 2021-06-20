import express, {Request, Response} from 'express';
import {Todo} from '../models/todo';

const router = express.Router();

router.get('/todos', [], async (req: Request, res: Response) => {
    const todo = await Todo.find({});
    const todoPage: number = +(req.query.page || 0);
    const todoLimit: number = +(req.query.limit || 0);

    if (todoPage && todoLimit) {
        let pageChunk = todo.slice((todoPage - 1) * todoLimit, (todoLimit * todoPage));
        return res.status(200).send(pageChunk);
    }

    return res.status(200).send(todo);
});

router.get('/todos/:id', [], async (req: Request, res: Response) => {
    const todoId = {_id: req.params.id};

    try {
        const todo = await Todo.findById(todoId);

        return res.status(200).send(todo);
    } catch (error) {
        return res.status(404).send('');
    }
});

router.post('/todos', async (req, res) => {
    const {message, completed} = req.body;
    const todo = Todo.build({message, completed});

    await todo.save();

    return res.status(201).send(todo);
});

router.patch('/todos', async (req, res) => {
    const {_id, message, completed} = req.body;
    const todoId = {_id: _id};

    try {
        let todo = await Todo.findByIdAndUpdate(todoId, {message: message, completed: completed});
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(400).send('');
    }
});

router.delete('/todos', async (req, res) => {
        const {_id} = req.body;
        const todoId = {_id: _id};

        try {
            let todo = await Todo.findByIdAndDelete(todoId);

            if(!todo) {
                return res.status(404).send('');
            }

            return res.status(204).send('');
        } catch (error) {
            return res.status(404).send('');
        }
    }
);

export {router as todoRouter};
