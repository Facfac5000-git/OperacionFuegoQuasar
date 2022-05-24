const { Schema, model } = require('mongoose')

const satellite = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    posX: {
        type: Number,
        default: 0
    },
    posY: {
        type: Number,
        default: 0
    }
})

module.exports = model('Satellite', satellite)