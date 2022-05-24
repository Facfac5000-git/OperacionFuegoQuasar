const Satellite = require('../models/Satellite')

// Sirven para instanciar los satélites en la base de datos cuando estos no existen
const setup = async () => {
    
    try {
        let satellites = await Satellite.find()

        if (!satellites.length) {
            console.log('Creando nuevo sistema de satellites')
            let newSatellite
            newSatellite = new Satellite(
                {
                    name:'kenobi', 
                    posX: -500, 
                    posY: -200
                })
            await newSatellite.save()
    
            newSatellite = new Satellite(
                {
                    name:'skywalker', 
                    posX: 100, 
                    posY: -100
                })
            await newSatellite.save()
    
            newSatellite = new Satellite(
                {
                    name:'sato', 
                    posX: 500, 
                    posY: 100
                })
            await newSatellite.save()
        }

        console.log('Los satélites se encuentran en órbita')
    } catch (error) {
        console.log('Error en setup:', error)
    }

}

module.exports = setup