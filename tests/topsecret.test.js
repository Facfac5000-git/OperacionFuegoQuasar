// Import de configuración
require('dotenv').config()
const setup = require('../config/setup')

// Import de dependencias
const request = require('supertest')

// Import de Server y Helper
const app = require('../app')
const helper = require('./helper')

jest.setTimeout(80000)

describe('testing endpoints', () => {

    beforeAll(async () => {
        await helper.testDbConnect()
        await setup()
        await helper.testSetup()
    })
    
    afterAll(async () => {
        await helper.testDbDisconnect()
    })
    
    describe('testing topsecret method', () => {
    
        it('returns 400 - Bad Request when body is empty', async () => {
            await request(app).post('/topsecret')
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if body has satellite but it is not an array', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidNotArraySatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if elements in satellites has not name', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidNotNameSatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if elements in satellites has not message', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidNotMessageSatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if elements in satellites has not distance', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidNotDistanceSatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if distance in elements are not numeric', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidDistanceNotNumericSatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if message in elements are not an array', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidMessageNotArraySatellitesBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    
        it('returns position and message when everythings it is ok', async () => {
            const response = await request(app)
                .post('/topsecret')
                .send(helper.okSatelliteBody)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            expect(response.body.position).toBeDefined()
            expect(response.body.message).toBeDefined()
        })
    
        it('returns 404 when satellites are collinears', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.collinearSatelliteBodies)
                .expect(404)
                .expect('Content-Type', /application\/json/)
                .then((res) => {
                    expect(res.body.error).toBeDefined()
                    expect(res.body.error).toBe('No se puede llevar a cabo una trilateración si todos los puntos se encuentran colineales entre sí.')        
                })
        })
    
        it('returns 404 when there are less than 3 beacons', async () => {
            const okSatelliteBody = helper.okSatelliteBody
            expect(okSatelliteBody.satellites).toHaveLength(3)
    
            okSatelliteBody.satellites.pop()
            expect(okSatelliteBody.satellites).toHaveLength(2)
    
            await request(app)
                .post('/topsecret')
                .send(okSatelliteBody)
                .expect(404)
                .expect('Content-Type', /application\/json/)
                .then((res) => {
                    expect(res.body.error).toBeDefined()
                    expect(res.body.error).toBe('Se necesitan al menos 3 puntos y sus distancias para coordinar correctamente la ubicacion.')        
                })
        })
    
        it('returns 404 when messages can not be decrypted', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.indecipherableMessageSatelliteBodies)
                .expect(404)
                .expect('Content-Type', /application\/json/)
                .then((res) => {
                    expect(res.body.error).toBeDefined()
                    expect(res.body.error).toBe('No pudieron determinarse todas las palabras del mensaje.')        
                })
        })
    })
    
    describe('testing topsecret split post method', () => {
        
        it('returns 400 - Bad Request if distance in beacon body is not numeric', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidDistanceNotNumericBeaconBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        it('returns 400 - Bad Request if message in beacon body is not an array', async () => {
            await request(app)
                .post('/topsecret')
                .send(helper.invalidMessageNotArrayBeaconBody)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
      
        it('returns 200 and the beacon instanced if everything it is ok', async () => {
            await request(app)
                .post('/topsecret_split/sato')
                .send(helper.okBeaconBody)
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then((res) => {
                    expect(res.body._id).toBeDefined()
                    expect(res.body.satellite).toBeDefined()
                    expect(res.body.distance).toBeDefined()
                    expect(res.body.distance).toBe(helper.okBeaconBody.distance)
                    expect(res.body.message).toBeDefined()
                    expect(res.body.message).toStrictEqual(helper.okBeaconBody.message)     
                })
        })
    })
    
    describe('testing topsecret split get method', () => {
        
        it('returns 200 and position and message if everything is ok', async () => {
            await request(app)
                .get('/topsecret_split')
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body.position).toBeDefined()
                    expect(res.body.message).toBeDefined()
                })
        })
    })
})
