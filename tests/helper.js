//Import de dependencias
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongoMemoryServer

//Import de Models
const Satellite = require('../models/Satellite')
const Beacon = require('../models/Beacon')

const testSetup = async () => {
    
    let newSatellite, satelliteExists, response

    satelliteExists = Satellite.findOne({name: 'collinearkenobi'})
    if(!satelliteExists.length) {
        newSatellite = new Satellite(
            {
                name:'collinearkenobi', 
                posX: 500, 
                posY: 250
            })
        response = await newSatellite.save()
    }

    satelliteExists = Satellite.findOne({name: 'collinearskywalker'})
    if(!satelliteExists.length) {
        newSatellite = new Satellite(
            {
                name:'collinearskywalker', 
                posX: 500, 
                posY: 0
            })
        await newSatellite.save()
    }

    satelliteExists = Satellite.findOne({name: 'collinearsato'})
    if(!satelliteExists.length) {
        newSatellite = new Satellite(
            {
                name:'collinearsato', 
                posX: 500, 
                posY: -500
            })
        await newSatellite.save()
    }

    console.log('Los satélites de prueba se encuentran en órbita')

    let beacons = Beacon.find({})

    if(!beacons.length) {
        const kenobi = await Satellite.findOne({name: 'kenobi'})
        const skywalker = await Satellite.findOne({name: 'skywalker'})
        const sato = await Satellite.findOne({name: 'sato'})

        let newBeacon
        newBeacon = new Beacon({
            satellite: kenobi,
            distance: 100,
            message: ["", "", "es", "", "mensaje", ""]
        })
        await newBeacon.save()

        newBeacon = new Beacon({
            satellite: skywalker,
            distance: 115.5,
            message: ["", "es", "", "", "secreto"]
        })
        await newBeacon.save()

        newBeacon = new Beacon({
            satellite: sato,
            distance: 142.7,
            message: ["este", "", "un", "", ""]
        })
        await newBeacon.save()
    }

    console.log('Las balizas de prueba han sido almacenadas')
}

const testDbConnect = async () => {
    mongoMemoryServer = await MongoMemoryServer.create()
    const uri = mongoMemoryServer.getUri()

    await mongoose.connect(uri)

    console.log('Conectado a la base de datos de prueba')
}

const testDbDisconnect = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoMemoryServer.stop()
}

const okSatelliteBody = {
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100,
            "message": ["", "", "es", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "distance": 115.5,
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "distance": 142.7,
            "message": ["este", "", "un", "", ""]
        }
    ]
}

const invalidNotArraySatellitesBody = {
    "satellites": "No soy un array"
}

const invalidNotNameSatellitesBody = {
    "satellites": [
        {
            "distance": 100,
            "message": ["", "", "es", "", "mensaje", ""]
        },
        {
            "distance": 115.5,
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "distance": 142.7,
            "message": ["este", "", "un", "", ""]
        }
    ]
}
    
const invalidNotMessageSatellitesBody = {
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100
        },
        {
            "name": "skywalker",
            "distance": 115.5
        },
        {
            "name": "sato",
            "distance": 142.7
        }
    ]
}

const invalidNotDistanceSatellitesBody = {
    "satellites": [
        {
            "name": "kenobi",
            "message": ["", "", "es", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "message": ["este", "", "un", "", ""]
        }
    ]
}

const invalidDistanceNotNumericSatellitesBody = {
    "satellites": [
        {
            "name": "kenobi",
            "distance": "No soy un número",
            "message": ["", "", "es", "", "mensaje", ""]
        },
        {
            "name": "skywalker",
            "distance": "No soy un numero",
            "message": ["", "es", "", "", "secreto"]
        },
        {
            "name": "sato",
            "distance": "No soy un numero",
            "message": ["este", "", "un", "", ""]
        }
    ]
}

const invalidMessageNotArraySatellitesBody = {
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100,
            "message": "No soy un array"
        },
        {
            "name": "skywalker",
            "distance": 115.5,
            "message": "No soy un array"
        },
        {
            "name": "sato",
            "distance": 142.7,
            "message": "No soy un array"
        }
    ]
}

const collinearSatelliteBodies = {
    "satellites": [
        {
            "name": "collinearkenobi",
            "distance": 500,
            "message": ["este", "es", "un", "mensaje", "secreto"]
        },
        {
            "name": "collinearskywalker",
            "distance": 500,
            "message": ["este", "es", "un", "mensaje", "secreto"]
        },
        {
            "name": "collinearsato",
            "distance": 500,
            "message": ["este", "es", "un", "mensaje", "secreto"]
        }
    ]
}

const indecipherableMessageSatelliteBodies = {
    "satellites": [
        {
            "name": "kenobi",
            "distance": 100,
            "message": ["este", "", "tiene", "", "indescifrables"]
        },
        {
            "name": "skywalker",
            "distance": 115.5,
            "message": ["", "", "", "palabras", ""]
        },
        {
            "name": "sato",
            "distance": 142.7,
            "message": ["este", "", "tiene", "palabras", "indescifrables"]
        }
    ]
}

const invalidDistanceNotNumericBeaconBody = {
    "distance": "No soy un número",
    "message": ["este", "", "un", "", ""]
}

const invalidMessageNotArrayBeaconBody = {
    "distance": 142.7,
    "message": "No soy una array"
}

const okBeaconBody = {
    "distance": 142.7,
    "message": ["este", "", "un", "", ""]
}

module.exports = { 
    testSetup,
    testDbConnect,
    testDbDisconnect,
    okSatelliteBody, 
    invalidNotArraySatellitesBody,
    invalidNotNameSatellitesBody,
    invalidNotMessageSatellitesBody,
    invalidNotDistanceSatellitesBody,
    invalidDistanceNotNumericSatellitesBody,
    invalidMessageNotArraySatellitesBody,
    collinearSatelliteBodies,
    indecipherableMessageSatelliteBodies,
    invalidDistanceNotNumericBeaconBody,
    invalidMessageNotArrayBeaconBody,
    okBeaconBody
}