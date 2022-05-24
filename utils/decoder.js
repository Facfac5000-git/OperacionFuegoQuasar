/*
Decoder sirve para interpretar un mensaje a partir de un conjunto de mensajes; estos mensajes son arrays donde cada elemento es un string que corresponde 
a una palabra y donde una posición "" significa una palabra que no puede ser reconocida.
Ante la posibilidad de desfasaje de mensajes, se acomodan los arrays en base a aquel que posee menor cantidad de elementos, considerando que aquellos con un 
mayor número de elementos poseen retrasos ("") al inicio que deben ser limpiados. 
*/

const getMessage = function(messages) {
    // Se consigue la cantidad de elementos del array más pequeño
    let minLength = Infinity
    messages.forEach((message) => {
        if(message.length < minLength) {
            minLength = message.length
        }
    })

    // Se limpian los retrasos del inicio de todos aquellos arrays con un mayor número de elementos
    messages.forEach((message) => {
        while(message.length > minLength) {
            if(message[0] === ""){
                message.splice(0,1)
            } else {
                throw 'No se pueden limpiar los retrasos de desfasaje para nivelar los mensajes.'
            }
        }
    })

    // Se verifica que para cada posición al menos uno de los arrays tenga una palabra no vacía,
    // si dos o más posiciones tienen palabras no vacías se verifica que sean las mismas
    messageDecoded = []
    for (let i = 0; i < minLength; i++) {
        let auxWord = ""
        messages.forEach((message) => {
            if (auxWord == ""){
                auxWord = message[i]
            } else if (message[i] !== auxWord && message[i] !== "") {
                throw 'Se encontraron palabras diferentes para la misma posición.'
            }
        })

        if(auxWord == ""){
            throw 'No pudieron determinarse todas las palabras del mensaje.'
        }

        messageDecoded.push(auxWord)
    }

    return messageDecoded.join(' ')
}

module.exports = {
    getMessage
}