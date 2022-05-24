const { Schema, model } = require('mongoose')

const beacon = new Schema({
    satellite: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Satellite'
    },
    distance: {
        type: Number,
        required: true
    },
    message: {
        type: [String],
        required: true
    }
})

module.exports = model('Beacon', beacon)