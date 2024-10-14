const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3003;

// Use async/await to handle database connection
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017', { dbName: 'todo' });
        console.log('Connected to database');
    } catch (err) {
        console.log('Database connection error:', err);
    }
}

connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: String,
    createAt: { type: Date, default: Date.now }
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

// Handle GET request for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do API. Use /todos to interact with the to-do list.');
});

// Create To-Do
app.post('/', async (req, res) => {
    console.log(req.body);
    const { title, description, createdBy } = req.body;

    const toDoAdd = new ToDo({
        title,
        description,
        createdBy
    });

    try {
        const todo = await toDoAdd.save();
        res.status(201).json({
            message: 'To-Do has been created',
            todo
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

// View To-Do
app.get('/todos/', async (req, res) => {
    try {
        const todos = await ToDo.find({});  // Updated to 'todos'
        res.status(200).json({
            message: 'All ToDos',
            todos  // Updated to 'todos'
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

// View Single To-Do
app.get('/todos/:todo_id', async (req, res) => {
    const { todo_id } = req.params;

    try {
        const todo = await ToDo.findById(todo_id);  // Updated to 'todo'
        if (!todo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json({
            message: 'To-Do',
            todo  // Updated to 'todo'
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

// Update Single To-Do
app.patch('/todos/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
    const { title, description, createdBy } = req.body;

    try {
        const todo = await ToDo.findByIdAndUpdate(todo_id, {
            title,
            description,
            createdBy
        }, { new: true }); // This option returns the modified document
        if (!todo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json({
            message: 'To-Do updated',
            todo  // Updated to 'todo'
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

// Remove Single To-Do
app.delete('/todos/:todo_id', async (req, res) => {
    const { todo_id } = req.params;

    try {
        const todo = await ToDo.findByIdAndDelete(todo_id);  // Updated to 'todo'
        if (!todo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }
        res.status(200).json({
            message: 'To-Do has been removed',
            todo  // Updated to 'todo'
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

// Remove all To-Do
app.delete('/todos/', async (req, res) => {
    try {
        const result = await ToDo.deleteMany({});
        res.status(200).json({
            message: 'All To-Do has been removed',
            result
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});

app.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
});
