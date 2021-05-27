const {Schema, model} = require('mongoose');

const schema = new Schema({
    status: {type: Boolean, required: true},
    parts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Parts',
        }
    ]
});

module.exports = model('Order', schema);