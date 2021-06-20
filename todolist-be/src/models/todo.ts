import mongoose from 'mongoose';

interface ITodo {
    message: string;
    completed: boolean;
}

interface TodoModelInterface extends mongoose.Model<TodoDoc> {
    build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
    message: string;
    completed: boolean;
}

const  todoSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

todoSchema.statics.build = (attr: ITodo) => {
    return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, TodoModelInterface>('Todo', todoSchema);

export { Todo };
