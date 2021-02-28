require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const { getThings, addThing, updateThingById, deleteThignById, getThingById } = require('./handlers/handler');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const asyncHandler = require('express-async-handler');
const { validateParam } = require('./util/validator');;
const validateIdParam = validateParam('id');

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan('short'));
app.use(cors());

app.get('/api/v2/things', asyncHandler(async (req, res) => {
    const {page, limit} = req.query;     
    const things = await getThings(page, limit);
    res.send(things)
}));

app.get('/api/v2/things/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const thing = await getThingById(id);
    res.send(thing);
}));

app.post('/api/v2/things', asyncHandler(async (req, res) => {
    const { name, any } = req.body;

    if (!name) {
        return res.sendStatus(400);
    }
    await addThing({ name, any });
    res.send(201);
}));

app.put('/api/v2/things/:id', validateIdParam, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, any } = req.body;

    if (!name) {
        return res.sendStatus(400);
    }
    await updateThingById({ id, name, any });
    res.send(200);
}));

app.delete('/api/v2/things/:id', validateIdParam, asyncHandler(async (req, res) => {
    const { id } = req.params;
    await deleteThignById(id);
    res.send(200);
}));

app.all('*', (req, res) => {
    res.sendStatus(404);
})

const server = app.listen(PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

