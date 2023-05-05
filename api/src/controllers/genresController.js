const { Genres } = require('../db.js')
const axios = require('axios')
require('dotenv').config();
const { API_KEY } = process.env;

const { cleanAPIGenres } = require('./cleanAPI.js')

const getArrObj = async (req, res) => {

    try {
        /* ************OBTENEMOS INFO DE LA API******************** */
        const dataAPI = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

        const infoAPI = cleanAPIGenres(dataAPI)

        // console.log(infoAPI);
        /* ************LO AGREGAMOS A LA DB******************** */
        for (let i = 0; i < infoAPI.length; i++) {
            // console.log(infoAPI[i].name);
            await Genres.findOrCreate({ where: { name: infoAPI[i].name } })
        };

        const getGenres = await Genres.findAll();

        res.status(200).json(getGenres)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getArrObj }