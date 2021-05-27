const {Schema, model} = require('mongoose');

const schema = new Schema({
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car',
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {type: Boolean, required: true}
});

module.exports = model('Order', schema);