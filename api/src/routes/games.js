const {Router} = require('express');

const {gamesArrObj, gameXId, gameXname, gameCreate} = require('../controllers/gamesController.js')

const gamesRouter = Router();

gamesRouter.get('/', gamesArrObj)

gamesRouter.get('/name', gameXname)

gamesRouter.get('/detail/:idVideogame',gameXId)

gamesRouter.post('/', gameCreate)

module.exports = gamesRouter;