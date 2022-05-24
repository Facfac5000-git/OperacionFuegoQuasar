//Import de utils
const trilateration = require('../utils/trilateration')
const decoder = require('../utils/decoder')

//Import de modelos
const Satellite = require('../models/Satellite')
const Beacon = require('../models/Beacon')

var processDistressCall = async (satellites = null) => {

    let position = 0
    let message = ''

    let beacons = []
    let messages = []

    if(satellites) {
        const activeSatellites = await Satellite.find()

        satellites.forEach((satellite) => {
            messages.push(satellite.message)
    
            activeSatellites.forEach((activeSatellite) => {
                if(satellite.name.toLowerCase() === activeSatellite.name.toLowerCase()) {
                    beacons.push({
                        posX: activeSatellite.posX,
                        posY: activeSatellite.posY,
                        distance: satellite.distance
                    })
                }
            })
        })
    } else {
        const savedBeacons = await Beacon.find().populate('satellite')

        savedBeacons.forEach((savedBeacon) => {
            messages.push(savedBeacon.message)
    
            beacons.push({
                posX: savedBeacon.satellite.posX,
                posY: savedBeacon.satellite.posY,
                distance: savedBeacon.distance
            })
        })
    }

    position = trilateration.getLocation(beacons)
    message = decoder.getMessage(messages)

    return { position, message }
}

module.exports = processDistressCall