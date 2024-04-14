const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3001;


app.use(express.json());


app.get('/', (req, res) => {
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json:', err);
            return res.status(500).send('Internal Server Error');
        }
        const tasks = JSON.parse(data);
        res.status(200).json(tasks);
    });
});


app.get('/delete', (req, res) => {
    const taskId = parseInt(req.query.id);

    if (isNaN(taskId)) {
        return res.status(400).send('Invalid task id');
    }

    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todo.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => task.id !== taskId);

        fs.writeFile('todo.json', JSON.stringify(tasks), (err) => {
            if (err) {
                console.error('Error writing to todo.json:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.status(200).json(tasks);
        });
    });
});


app.listen(PORT, () => {
    console.log('Server started...');
});
