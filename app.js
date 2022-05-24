// Import de liberías
const express = require('express')
const cors = require('cors')

// Import de routers
const topsecretRouter = require('./routes/topsecret')

// Instancia del servidor
const app = express()

// Middlewares para el uso del servidor
app.use(express.json())
app.use(cors())

// Instancia de routers
app.use('', topsecretRouter)

module.exports = app