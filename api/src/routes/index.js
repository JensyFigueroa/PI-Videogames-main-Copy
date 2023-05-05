const { Router } = require('express');
// Importar todos los routers;
const gamesRouter = require('./games.js')
const genresRouter = require('./genres.js')

const router = Router();

// Configurar los routers

router.use('/videogames', gamesRouter)
router.use('/genres', genresRouter)


module.exports = router;
