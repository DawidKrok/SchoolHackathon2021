const router = require('express').Router()
const tokenServices = require("../services/tokenServices")

//&&&&&&&&&&&&&| GET METHODS |&&&&&&&&&&&&&&
router.get("/", (req, res) => {
    res.render("index", {title: "Strona główna"})
})

router.get("/place/:placeIndex/:placeId", (req, res) => {
    res.render("place", {title: "Strona z miejscem", placeIndex: req.params.placeIndex, placeId: req.params.placeId})
})
router.get("/event/:eventIndex/:eventId", (req, res) => {
    res.render("event", {title: "Strona eventowa", eventIndex: req.params.eventIndex, eventId: req.params.eventId})
})
router.get("/map/:placeId", (req, res) => {
    res.render("map", {title: "Strona z miejscem", placeId: req.params.placeId})
})


// TEST
router.get("/img", (req, res) => {
    res.render("img-send")
})

module.exports = router
