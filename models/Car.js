const {Schema, model} = require('mongoose');

const schema = new Schema({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    win: {type: String, required: true},
    year: {type: Number, required: true},
    description: {type: String},
    parts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parts',
        }
    ]
});

module.exports = model('Car', schema);