require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { indexOfObjById } = require('../util/indexOfObjById');
const filePathJson = path.join(__dirname, '../', process.env.FILE_JSON);

function getThings(request, response) {
    let data = '';
    const readStream = fs.createReadStream(filePathJson, 'utf8');
    readStream.on('data', (chunk) => {
        data += chunk;
    });

    readStream.on('end', () => {
        response.send(JSON.parse(data));
    });
};

function addThing(request, response) {
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
};

function updateThingById(request, response) {
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
};

function deleteThignById(request, response) {
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
};

module.exports = {getThings, addThing, updateThingById, deleteThignById};
