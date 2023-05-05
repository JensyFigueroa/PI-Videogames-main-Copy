const cleanGames = (arr) => {
    const result = arr.map((e) => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name),
            image: e.background_image,
            released: e.released,
            rating: e.rating
        }
    })
    return result
}

const cleanObjDB = (obj) => {
    let arrDB = []
    let valores = Object.values(obj);
    for (let i = 0; i < valores.length; i++) {
        arrDB.push({
            id: valores[i].dataValues.id,
            name: valores[i].dataValues.name,
            description: valores[i].dataValues.description,
            platforms: valores[i].dataValues.platform,
            genres: valores[i].dataValues.Genres.map(genre => genre.dataValues.name),
            image: valores[i].dataValues.image,
            released: valores[i].dataValues.released,
            rating: valores[i].dataValues.rating
        })
    }
    return arrDB; 
}

const cleanObjAPI = (obj) => {
    let arrAPI = {
            id: obj.data.id,
            name: obj.data.name,
            description: obj.data.description.replaceAll(/<("[^"]"|'[^']'|[^'">])*>/g,""),
            platforms: obj.data.platform,
            image: obj.data.background_image,
            released: obj.data.released,
            rating: obj.data.rating
        }

 return arrAPI; 
}

const cleanAPIGenres = (arr) => {
    const result = arr.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    })
    return result
}

module.exports = { cleanGames, cleanObjDB, cleanObjAPI, cleanAPIGenres };