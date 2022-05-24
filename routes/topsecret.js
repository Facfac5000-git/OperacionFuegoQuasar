// Import de dependencias
const { Router } = require('express')
const { check } = require('express-validator')

// Import de controladores
const { 
    topsecret,
    topsecret_split_post,
    topsecret_split_get,
    topsecret_test
} = require('../controllers/topsecretController')

// Import de middlewares
const validationErrors = require('../middlewares/validationErrors')

// Instanciación del router
const topsecretRouter = Router()

topsecretRouter.post('/topsecret', [
        check('satellites', 'Debe existir satellites en el payload y debe ser un array de objetos.').isArray(),
        check('satellites.*', 'Los elementos dentro de satellites deben ser objetos').isObject(),
        check('satellites.*.name', 'Los objetos dentro de satellites deben tener un nombre.').notEmpty().isString(),
        check('satellites.*.distance', 'Los objetos dentro de satellites deben tener un valor de distancia y debe ser numérico').isNumeric(),
        check('satellites.*.message', 'Los objetos dentro de satellites deben tener un array con las palabras del mensaje.').isArray(),
        check('satellites.*.message.*', 'Los elementos dentro de message deben ser strings').isString()
    ], validationErrors, topsecret)

topsecretRouter.post('/topsecret_split/:satellite_name', [
        check('distance', 'Debe existir el valor de distancia y debe ser numérico').isNumeric(),
        check('message', 'Debe existir un array con las palabras del mensaje.').isArray(),
        check('message.*', 'Los elementos dentro de message deben ser strings').isString()
    ], validationErrors, topsecret_split_post)

topsecretRouter.get('/topsecret_split', topsecret_split_get)

module.exports = topsecretRouter