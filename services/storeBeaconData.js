// Import de modelos
const Satellite = require('../models/Satellite')
const Beacon = require('../models/Beacon')

var storeBeaconData = async (satellite_name, distance, message) => {
    const satellite = await Satellite.findOne({ name: satellite_name })
    
    if(!satellite) {
        throw 'El nombre del satélite ingresado no corresponde a uno de nuestros satélites en órbita.'
    }

    const beacon = await Beacon.findOne({ satellite }).populate('satellite')
    if(beacon) {
        beacon.distance = distance
        beacon.message = message
        await beacon.save()
        return beacon
    } else {
        const newBeacon = new Beacon({
            satellite, distance, message
        })
        await newBeacon.save()
        return newBeacon
    }
}

module.exports = storeBeaconData