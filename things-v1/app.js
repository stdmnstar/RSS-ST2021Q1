const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan')
const { indexOfObjById } = require('./util/indexOfObjById');
const app = express();
const cors = require('cors');
const jsonParser = express.json();
const PORT = process.env.PORT || 3000;
const filePathJson = path.join(__dirname, '/json/things.json');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());

app.all('/', (request, response) => {
    response.send({
        message1: 'GET api/v1/things -> list of all things',
        message2: 'POST api/v1/things -> create a new thing',
        message3: 'PUT api/v1/things/:id -> update an existing thing by its own id',
        message4: 'DELETE api/v1/things/:id -> delete an existing thing by its own id',
    });
});

app.get('/api/v1/things', (request, response) => {
    let data = '';
    const readStream = fs.createReadStream(filePathJson, 'utf8');
    readStream.on('data', (chunk) => {
        data += chunk;
    });

    readStream.on('end', () => {
        response.send(JSON.parse(data));
    });
});

app.post('/api/v1/things', jsonParser, function (request, response) {
    if (!request.body) {
        response.status(400);
        return response.send({ message: 'No data' });
    };

    const id = request.body.id;
    const name = request.body.name;
    if (!id || !name) {
        response.status(400);
        return response.send({ message: 'Required data missing' });
    };

    let data = '';
    const readStream = fs.createReadStream(filePathJson, 'utf8');
    readStream.on('data', (chunk) => {
        data += chunk;
    });

    readStream.on('end', () => {
        let things = JSON.parse(data);

        if (indexOfObjById(things, id) != -1) {
            response.status(400);
            return response.send({ message: 'id field is not unique ' });
        };

        things.push(request.body);
        data = JSON.stringify(things);
      
        let writableStream = fs.createWriteStream(filePathJson);
        writableStream.write(data);
        writableStream.end();

        writableStream.on('finish', () => {
            response.send(request.body);
        });
    });
});

app.put('/api/v1/things/:id', jsonParser, function (request, response) {
    if (!request.body) {
        response.status(400);
        return response.send({ message: 'No data' });
    };

    const newId = request.body.id;
    const name = request.body.name;
    if (!newId || !name) {
        response.status(400);
        return response.send({ message: 'Required data missing' });
    };

    const id = request.params.id;
    let data = '';
    const readStream = fs.createReadStream(filePathJson, 'utf8');
    readStream.on('data', (chunk) => {
        data += chunk;
    });

    readStream.on('end', () => {
        const things = JSON.parse(data);
        const index = indexOfObjById(things, id);

        if (index > -1) {
            things[index] = request.body;
            data = JSON.stringify(things);
            let writableStream = fs.createWriteStream(filePathJson);
            writableStream.write(data);
            writableStream.end();

            writableStream.on('finish', () => {
                response.send(things[index]);
            });
        }
        else {
            response.status(404);
            response.send({ message: 'Thing not found ' });
        };
    });

});

app.delete('/api/v1/things/:id', function (request, response) {
    const id = request.params.id;
    let data = '';
    const readStream = fs.createReadStream(filePathJson, 'utf8');
    readStream.on('data', (chunk) => {
        data += chunk;
    });

    readStream.on('end', () => {
        let things = JSON.parse(data);

        const index = indexOfObjById(things, id);
        if (index > -1) {
            const thing = things.splice(index, 1)[0];
            data = JSON.stringify(things);
            let writableStream = fs.createWriteStream(filePathJson);
            writableStream.write(data);
            writableStream.end();

            writableStream.on('finish', () => {
                response.send(thing);
            });
        }
        else {
            response.status(404);
            response.send({ message: 'Thing not found ' });
        };
    });
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
