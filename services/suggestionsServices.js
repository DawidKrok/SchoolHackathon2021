const Suggestion = require('../db/schemes').Suggestion


// &&&&&&&&&&&&&&&& | GETTING DATA | &&&&&&&&&&&&&&&

/** @Sends : all saved Suggestions from database */
getAllSuggestions = async (req, res) => {
    try {
        res.status(202).send(JSON.stringify(
            await Suggestion.find().lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Sends : Suggestion from database of given @id */
getSuggestion = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        res.status(202).send(JSON.stringify(
            await Suggestion.findById(req.body.id).lean()
        ))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}


// &&&&&&&&&&&&&&&& | SETTING DATA | &&&&&&&&&&&&&&&
/** @Adds : new Suggestion to database */
addSuggestion = async (req, res) => {
    try {
        if(!req.body.title || !req.body.description)  return res.sendStatus(400)

        const sugg = new Suggestion({
            title: req.body.title,
            description: req.body.description,
        })
        await sugg.save()

        res.status(202).send(JSON.stringify(sugg))
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

/** @Deletes : Suggestion from database */
deleteSuggestion = async (req, res) => {
    try {
        if(!req.body.id)  return res.sendStatus(400)

        Suggestion.deleteOne({_id: req.body.id}, err => {
            if(err) return res.sendStatus(403)
        })

        res.sendStatus(202)
    } catch(err) {
        res.sendStatus(500)
        console.log(err) 
    }
}

module.exports = {
    addSuggestion,
    getAllSuggestions,
    getSuggestion,
    deleteSuggestion
}