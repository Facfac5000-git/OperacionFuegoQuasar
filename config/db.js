const mongoose = require('mongoose')

//Conexión genérica async a base de datos Mongo, mediante librería mongoose
const dbConn = async () => {
    try{
        await mongoose.connect(process.env.DB_CONN)
        console.log('Conectado a la base de datos')
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error)
    }
}

module.exports = dbConn