import express, {Request, Response} from 'express';
import {Todo} from '../models/todo';

const router = express.Router();

router.get('/api/todo', [], async (req: Request, res: Response) => {
    const todo = await Todo.find({});
    return res.status(200).send(todo);
});

router.get('/api/todo/:id', [], async (req: Request, res: Response) => {
    const todoId = {_id: req.params.id};
    try {
        const todo = await Todo.findById(todoId);
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(404).send('');
    }
});

router.post('/api/todo', async (req, res) => {
    const {message, completed} = req.body;
    const todo = Todo.build({message, completed});
    await todo.save();
    return res.status(201).send(todo);
});

router.patch('/api/todo', async (req, res) => {
    const {_id, message, completed} = req.body;
    const todoId = {_id: _id};
    try {
        let todo = await Todo.findByIdAndUpdate(todoId, {message: message, completed: completed});
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(400).send('');
    }
});

router.delete('/api/todo', async (req, res) => {
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
