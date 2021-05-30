const {Schema, model} = require('mongoose');

const schema = new Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    description: {type: String}
});

module.exports = model('Car', schema);