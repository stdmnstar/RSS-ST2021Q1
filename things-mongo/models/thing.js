const { Schema, model } = require('mongoose');

const thingSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  any: Schema.Types.Mixed,
  _deletedAt: { type: Date, default: null },
});

module.exports = model('tning', thingSchema);
