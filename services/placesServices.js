const Place = require('../db/schemes').Place


// &&&&&&&&&&&&&&&& | GETTING DATA | &&&&&&&&&&&&&&&
/** @Sends : Places count */
placesCount = async (req, res) => {
    try {
        res.status(202).send(JSON.stringify({
            places_count: await Place.countDocuments({})
        }))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : all saved Places from database */
getAllPlaces = async (req, res) => {
    try {
        res.status(202).send(JSON.stringify(
            await Place.find().lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : Place from database of given @id */
getPlace = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)


        res.status(202).send(JSON.stringify(
            await Place.findById(req.body.id).lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}


// &&&&&&&&&&&&&&&& | SETTING DATA | &&&&&&&&&&&&&&&
/** @Adds : new Place to database */
addPlace = async (req, res) => {
    try {
        if(!req.body.name || !req.body.type || !req.body.description || !req.body.map_url || !req.body.game_url)  return res.sendStatus(400)

        const place = new Place({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            map_url: req.body.map_url,
            game_url: req.body.game_url
        })
        await place.save()

        res.status(202).send(JSON.stringify(place))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Updates Place of given id with given data */
updatePlace = async (req, res) => {
    try {
        if(!req.body.id)    return res.sendStatus(403)

        // try to find place with given id in database
        const place = await Place.findById(req.body.id)
        if(!place)  return res.sendStatus(404)

        // if one of the given data is falsy, corresponding value won't change
        place.name = req.body.name || place.name
        place.type = req.body.type || place.type
        place.description = req.body.description || place.description
        place.map_url = req.body.map_url || place.map_url
        place.game_url = req.body.game_url || place.game_url

        await place.save()

        res.status(202).send(JSON.stringify(place))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Deletes : Place from database */
deletePlace = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        Place.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(403)
        })

        res.sendStatus(202)
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    addPlace,
    placesCount,
    getAllPlaces,
    getPlace,
    updatePlace,
    deletePlace
}