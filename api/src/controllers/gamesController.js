const { Videogame, Op, Genres } = require('../db.js');
const axios = require('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const { cleanGames, cleanObjDB, cleanObjAPI } = require('./cleanAPI.js');

const gamesArrObj = async (req, res) => {
    try {
        /* ***************CONSULTANDO A LA DB************************ */
        const dataDB = await Videogame.findAll({ include: [{ model: Genres, attributes: ['name'] }] });

        let gameDB = cleanObjDB(dataDB)

        /* ***************CONSULTANDO A LA API************************ */
        let dataAPI = [];

        for (let i = 0; i < 6; i++) { // cantida de veces que se  invoca en la API, YA QUE LA API TRAE 20 JUEGOS POR PAGINA
            if (i === 0) {
                dataAPI.push((await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results);
            } else {
                dataAPI.push((await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results);

            }
        }

        const gamesCleared = cleanGames(dataAPI.flat())//Creamos un nuevo arreglo con flat con todos los sub arreglos. Y luego lo pasamos al cleanGames que limpie las propiedas y nos devuelva que necesitamos 

        const gameAPI = gamesCleared.filter((game, index, self) => index === self.findIndex(e => e.id === game.id))//de esta manera verificamos que nos e repitan los id

        const result = [...gameDB, ...gameAPI] // Unificamos los datos obtenidos de la DB y API

        // console.log(result);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// const gameXId = async (req, res) => {
//     const { idVideogame } = req.params

//     try {
//         if (!isNaN(idVideogame)) { //verificamos que el id no se alfanumerico
//             const gameApi = (await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data;
//             res.status(200).json(cleanGames([gameApi]))
//         } else {
//             const gameDB = await Videogame.findByPk(idVideogame, {include:[{model:Genres, attributes:['name'], through:{attributes:[]}}]})
//             res.status(200).json([gameDB])
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message })   
//     }

// }

const gameXId = (req, res) => {
    const { idVideogame } = req.params;

    if (!isNaN(idVideogame)) { //verificamos que el id no se alfanumerico
       axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
        .then(response => res.status(200).json(cleanObjAPI(response)))
        .catch(error => res.status(500).json({error: error.message}))          

    } else {
        Videogame.findByPk(idVideogame, { include: [{ model: Genres, attributes: ['name'], through: { attributes: [] } }] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({error: error.message})) 
    }
}


const gameXname = async (req, res) => {
    const { name } = req.query
    try {
        /* ***************CONSULTANDO A LA DB************************ */

        const gameDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            include: [{ model: Genres, attributes: ['name'] }]
        })

        // console.log(gameDB)
        /* ***************OBTENIENDO INFO A LA API************************ */
        const dataAPI = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results;
        // console.log(dataAPI);

        const gameAPI = cleanGames(dataAPI)

        const result = [...gameDB, ...gameAPI] // Unificamos los datos obtenidos de la DB y API

        let top15 = [];

        if (result.length >= 15) { //Verificamos con el condicional que el result si es mayor o igual a 15 sio que devuelva lo que consiguio
            for (let i = 0; i < 15; i++) {
                top15.push(result[i]);
            }
        } else {
            for (let i = 0; i < result.length; i++) {
                top15.push(result[i]);
            }
        }
        //    console.log(top15.length);
        res.status(200).json(top15);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const gameCreate = async (req, res) => {
    const { name, description, platforms, genres, image, released, rating } = req.body;

    try {
        if (!name || !description || !platforms || !genres || !image || !released || !rating) res.status(400).json({ message: 'Faltan datos' })
        /* ************VERIFICANDO LA DB SI EXISTE SINO CREAMOS EL GAME EN DB******************** */
        const [newGame, created] = await Videogame.findOrCreate({ where: { name, description, platforms, image, released, rating } })

        if (created === false) return alert('Videosgame exists')

        if (genres.length) {
            const genresPromise = await Promise.all(genres.map((genre) => Genres.findAll({ where: { name: genre } })))

            await newGame.addGenres(genresPromise.map(e => e[0]))
        }

        res.status(200).json(newGame)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { gamesArrObj, gameXId, gameXname, gameCreate }