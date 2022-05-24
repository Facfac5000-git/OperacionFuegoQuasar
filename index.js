// Import de configuración
require('dotenv').config()
const dbConn = require('./config/db')
const setup = require('./config/setup')
dbConn()
setup()

//Import de app
const app = require('./app')

// Server Listen
const server = app.listen(process.env.PORT, () => {
    console.log(`Aplicación corriendo en el puerto ${process.env.PORT}`)
})

module.exports = { server }