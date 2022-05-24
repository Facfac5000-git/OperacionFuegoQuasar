//Import de servicios
const processDistressCall = require('../services/processDistressCall')
const storeBeaconData = require('../services/storeBeaconData')

const topsecret = async (req, res) => {
    const { satellites } = req.body

    try {
        const distressCall = await processDistressCall(satellites)

        return res.status(200).json(distressCall)
    } catch (error) {
        return res.status(404).json({ error })
    }
}

const topsecret_split_post = async (req, res) => {
    const { satellite_name } = req.params
    const { distance, message } = req.body

    try {
        const storedBeacon = await storeBeaconData(satellite_name, distance, message)

        return res.status(200).json(storedBeacon)
    } catch(error) {
        return res.status(404).json({ error })
    }
}

const topsecret_split_get = async (req, res) => {
    
    try {
        const distressCall = await processDistressCall()

        return res.status(200).json(distressCall)
    } catch (error) {
        return res.status(404).json({ error })
    }
}

module.exports = {
    topsecret, topsecret_split_get, topsecret_split_post
}