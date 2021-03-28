require('dotenv').config();

const Thing = require('../models/thing');

async function getThings(page, limit) {
    let skip = 0;
    if (page) {
        limit = parseInt(limit, 10) || 10;
        skip = (page - 1) * limit;        
    }

    return await Thing.find({ _deletedAt: null })
        .skip(skip)
        .limit(limit);
};

async function getThingById(id) {
    return await Thing.find({ _id: id, _deletedAt: null });
};

async function addThing({ name, any } = {}) {
    const thing = new Thing({ name, any });
    return thing.save();
};

async function updateThingById({ id, name, any, _deletedAt }) {
    const valuesToUpdate = {
        name,
        any,
        _deletedAt,
    };

    const omited = Object.keys(valuesToUpdate).reduce((R, k) => {
        if (valuesToUpdate[k] !== undefined) {
            R[k] = valuesToUpdate[k];
        }
        return R;
    }, {});

    return await Thing.updateOne({ _id: id }, omited);
};

async function deleteThignById(id) {
    return await updateThingById({ id, _deletedAt: Date.now() });
};

module.exports = { getThings, getThingById, addThing, updateThingById, deleteThignById };
