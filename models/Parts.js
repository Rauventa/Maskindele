const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    vendor: {type: String, required: true},
    status: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = model('Parts', schema);