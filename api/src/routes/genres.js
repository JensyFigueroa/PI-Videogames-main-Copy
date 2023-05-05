const {Router} = require('express');
const genresRouter = Router();

const  {getArrObj} = require('../controllers/genresController.js')
genresRouter.get('/', getArrObj)

module.exports = genresRouter;