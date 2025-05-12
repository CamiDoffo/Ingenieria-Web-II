const express = require('express');
const bodyParser = require('body-parser');
require('reflect-metadata');
const { DataSource } = require('typeorm');
const { Task } = require('./entity/Task');

const app = express();
app.use(bodyParser.json());

// Conexión con SQLite y TypeORM
const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'tasks.sqlite',
    synchronize: true,
    logging: false,
    entities: [Task],
});

AppDataSource.initialize().then(async () => {
    const taskRepo = AppDataSource.getRepository(Task);

    // GET all tasks
    app.get(['/', '/tasks/'], async (req, res) => {
        const tasks = await taskRepo.find();
        res.status(200).json({ tasks });
    });

    // GET one task by ID
    app.get('/tasks/:id', async (req, res) => {
        const task = await taskRepo.findOneBy({ id: parseInt(req.params.id) });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    });

    // CREATE new task
    app.post('/tasks/', async (req, res) => {
        const { description } = req.body;
        const task = new Task();
        task.description = description;
        task.done = false;
        await taskRepo.save(task);
        res.status(201).json(task);
    });

    // UPDATE task
    app.put('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        const task = await taskRepo.findOneBy({ id: parseInt(id) });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        const { description, done } = req.body;
        task.description = description;
        task.done = done;
        await taskRepo.save(task);
        res.status(200).json(task);
    });

    // DELETE task
    app.delete('/tasks/:id', async (req, res) => {
        const { id } = req.params;
        const task = await taskRepo.findOneBy({ id: parseInt(id) });
        if (!task) return res.status(404).json({ error: 'Task not found' });

        await taskRepo.remove(task);
        res.status(200).json(task);
    });

    app.listen(5000, () => {
        console.log('Servidor Express escuchando en http://localhost:5000');
    });

}).catch(error => console.log(error));
