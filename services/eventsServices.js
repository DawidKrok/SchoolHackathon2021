const Event = require('../db/schemes').Event


// &&&&&&&&&&&&&&&& | GETTING DATA | &&&&&&&&&&&&&&&

/** @Sends : all saved Events from database */
getAllEvents = async (req, res) => {
    try {
        res.status(202).send(JSON.stringify(
            await Event.find().lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : Event from database of given @id */
getEvent = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        res.status(202).send(JSON.stringify(
            await Event.findById(req.body.id).lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}


// &&&&&&&&&&&&&&&& | SETTING DATA | &&&&&&&&&&&&&&&
/** @Adds : new Event to database */
addEvent = async (req, res) => {
    try {
        if(!req.body.title || !req.body.takes_place_on || !req.body.img_link || !req.body.description)  
            return res.sendStatus(400)

        const event = new Event({
            title: req.body.title,
            published_on: req.body.published_on ? req.body.published_on : Date.now(),
            takes_place_on: req.body.takes_place_on,
            img_link: req.body.img_link,
            description: req.body.description,
        })
        await event.save()

        res.status(202).send(JSON.stringify(event))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Updates Event of given id with given data */
updateEvent = async (req, res) => {
    try {
        if(!req.body.id)    return res.sendStatus(403)

        // try to find place with given id in database
        const event = await Event.findById(req.body.id)
        if(!event)  return res.sendStatus(404)

        // if one of the given data is falsy, corresponding value won't change
        event.title = req.body.title || event.title
        event.published_on = req.body.published_on || event.published_on
        event.takes_place_on = req.body.takes_place_on || event.takes_place_on
        event.img_link = req.body.img_link || event.img_link
        event.description = req.body.description || event.description

        await event.save()

        res.status(202).send(JSON.stringify(event))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Deletes : Event from database */
deleteEvent = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        Event.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(403)
        })

        res.sendStatus(202)
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    addEvent,
    getAllEvents,
    getEvent,
    updateEvent,
    deleteEvent
}