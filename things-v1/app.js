require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const { getThings, addThing, updateThingById, deleteThignById } = require('./handlers/handler');
const app = express();
const cors = require('cors');
const jsonParser = express.json();
const PORT = process.env.PORT||3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, process.env.FILE_ACCESS_LOG), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());

app.get('/api/v1/things', (request, response) => {
    getThings(request, response);
});

app.post('/api/v1/things', jsonParser, function (request, response) {
    addThing(request, response);
});

app.put('/api/v1/things/:id', jsonParser, function (request, response) {
    updateThingById(request, response);
});

app.delete('/api/v1/things/:id', function (request, response) {
    deleteThignById(request, response);
});

app.use(function (request, response, next) {
    const err = new Error('Bad request');
    err.status = 404;
    next(err);
});

app.use(function (err, request, response, next) {
    response.status(err.status || 500);
    response.send({
        message: err.message,
        error: err
    })
})

const server = app.listen(PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});
