/*
Trilateration sirve para conseguir la posición de un punto a partir de otros 3 puntos fijos y la distancia entre cada uno y el objeto a ubicar.
Este método puede fallar cuando tenemos menos de 3 puntos o si estos puntos se encuentran colineares entre sí.
*/

const sqr = function(a) {
    return Math.pow(a,2)
}

const getLocation = function(beacons) {
    let j, k, x, y

    // Se verifican condiciones para aplicar trilateración
    if(beacons.length < 3) {
        throw 'Se necesitan al menos 3 puntos y sus distancias para coordinar correctamente la ubicacion.'
    } else if((beacons[0].posX == beacons[1].posX && beacons[1].posX == beacons[2].posX) || (beacons[0].posY == beacons[1].posY && beacons[1].posY == beacons[2].posY)) {
        throw 'No se puede llevar a cabo una trilateración si todos los puntos se encuentran colineales entre sí.'
    }

    // Permite escapar del error de división en 0, teniendo al menos un punto diferente del resto (no colineales) se puede acomodar posiciones para realizar el cálculo
    if(beacons[0].posY - beacons[2].posY == 0){
        const beaconsAux = beacons[0];
        beacons[0] = beacons[1];
        beacons[1] = beaconsAux;
    } else if(beacons[0].posY - beacons[1].posY == 0){
        const beaconsAux = beacons[0];
        beacons[0] = beacons[2];
        beacons[2] = beaconsAux;
    }

    // Calculo matemático para la resolución del sistema de ecuaciones de trilateración
    k = (sqr(beacons[0].posX) + sqr(beacons[0].posY) - sqr(beacons[1].posX) - sqr(beacons[1].posY) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / (2 * (beacons[0].posY - beacons[1].posY)) - (sqr(beacons[0].posX) + sqr(beacons[0].posY) - sqr(beacons[2].posX) - sqr(beacons[2].posY) - sqr(beacons[0].distance) + sqr(beacons[2].distance)) / (2 * (beacons[0].posY - beacons[2].posY))
    j = (beacons[2].posX - beacons[0].posX) / (beacons[0].posY - beacons[2].posY) - (beacons[1].posX - beacons[0].posX) / (beacons[0].posY - beacons[1].posY);
    x = k / j;
    y = ((beacons[1].posX - beacons[0].posX) / (beacons[0].posY - beacons[1].posY)) * x + (sqr(beacons[0].posX) + sqr(beacons[0].posY) - sqr(beacons[1].posX) - sqr(beacons[1].posY) - sqr(beacons[0].distance) + sqr(beacons[1].distance)) / (2 * (beacons[0].posY - beacons[1].posY));

    return { x, y }
}

module.exports = {
    getLocation
}
