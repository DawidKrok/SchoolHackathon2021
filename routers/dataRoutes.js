const router = require('express').Router()
const placesServices = require('../services/placesServices')
const eventsServices = require('../services/eventsServices')
const suggestionsServices = require('../services/suggestionsServices')
const tokenServices = require('../services/tokenServices')
const fileServices = require('../services/fileHandler')


//&&&&&&&&&&&&&| POST METHODS |&&&&&&&&&&&&&&

/** =============
 *     PLACES
 * ============= */

/** Adds new Place with given name, and returns it
 * req.body:
 * @name : name of the new place 
 * @type : type
 * @description : descritpion
 * @map_url : map_url
 * @game_url : game_url*/
router.post("/add_place", placesServices.addPlace)

 
/** Returns Number of all Place documents in database */
router.post("/places_count", placesServices.placesCount)

/** Returns all Places documents from database */
router.post("/get_all_places", placesServices.getAllPlaces)

/** Returns Place with given id 
 * req.body:
 * @id : id of place to return */
router.post("/get_place", placesServices.getPlace)

/** req.body:
 * @id : id of Place to update
 * @name : new name (optional)
 * @type : new type (optional)
 * @description : new descritpion (optional)
 * @map_url : new map_url (optional)
 * @game_url : new game_url (optional) */
router.post("/update_place", placesServices.updatePlace)

/** Deletes Place with given id 
 * req.body:
 * @id : id of place to delete */
router.post("/delete_place", placesServices.deletePlace)

/** =============
 *     EVENTS
 * ============= */

/** Adds new Event with given name, and returns it
 * req.body:
 * @title : title of the new event 
 * @published_on : Date on which event was published (optional)
 * @takes_place_on : Date on which event takes place 
 * @img_link : String with link to corresponding img 
 * @description : String with description of event */
 router.post("/add_event", eventsServices.addEvent)
 
 /** Returns all Events documents from database */
 router.post("/get_all_events", eventsServices.getAllEvents)
 
 /** Returns Event with given id 
  * req.body:
  * @id : id of event to return */
router.post("/get_event", eventsServices.getEvent)

/** Updates Event with given id
 * req.body:
 * @id : id of the Event
 * @title : (optional) 
 * @published_on : (optional)
 * @takes_place_on : (optional) 
 * @img_link : (optional) 
 * @description : (optional) */
router.post("/update_event", eventsServices.updateEvent)

 /** Deletes Event with given id 
  * req.body:
  * @id : id of event to delete */
 router.post("/delete_event", eventsServices.deleteEvent)

/** =============
 *   SUGGESTIONS
 * ============= */

/** Adds new Suggestion with given name, and returns it 
 * req.body:
 * @title : title of the new suggestion
 * @description : String with description of suggestion */
 router.post("/add_suggestion", suggestionsServices.addSuggestion)
 
 /** Returns all Suggestions documents from database */
 router.post("/get_all_suggestions", suggestionsServices.getAllSuggestions)
 
 /** Returns Suggestion with given id 
  * req.body:
  * @id : id of suggestion to return */
 router.post("/get_suggestion", suggestionsServices.getSuggestion)
 
 /** Deletes Suggestion with given id 
  * req.body:
  * @id : id of suggestion to delete */
 router.post("/delete_suggestion", suggestionsServices.deleteSuggestion)

/** =============
 *     FILES
 * ============= */

/** Adds Image to public/img/shared folder.
 * This Image must be send from input. */
router.post("/upload_img", tokenServices.checkLogged, fileServices.upload.single("img"), fileServices.saveImage)

/** Deletes File from serwer
 * req.body:
 * @filename : name of img to delete */
router.post("/delete_img", tokenServices.checkLogged, fileServices.deleteImage)

module.exports = router
