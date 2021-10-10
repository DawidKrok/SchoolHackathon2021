const express = require('express')
const router = express.Router()
const services = require('../services/adminServices')
const tokenServices = require('../services/tokenServices')

//&&&&&&&&&&&&&| POST METHODS |&&&&&&&&&&&&&&
/** req.body:
 * @email : obvious
 * @password : also obvious */
router.post("/login", services.authenticateAdmin, services.login)

/** req.body:
 * @email : obvious
 * @password : also obvious */
router.post("/register", services.register, services.login)

/** Data is retrieved from user's cookies 
 * @Deletes Refresh Token from database and user's cookies */
router.post("/logout", tokenServices.deleteToken)

// Basically just the page rendering
//&&&&&&&&&&&&&| GET METHODS |&&&&&&&&&&&&&&
router.get("/login", async(req, res) => {
    // check if client already have refreshToken and don't need to login
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/admin")

    res.render("login", {title: "Login"})
})

router.get("/register", async(req, res) => {
    // check if client already have refreshToken and don't need to register
    if(await tokenServices.checkRefreshToken(req.cookies.refreshToken))
        return res.redirect(307, "/admin")

    res.render("register", {title: "Register"})
})


router.get("/admin", tokenServices.checkLogged, (req, res) => {
    res.render("adminAdd", {title: "Admin"})
})
router.get("/admin/add", tokenServices.checkLogged, (req, res) => {
    res.render("adminAdd", {title: "Admin"})
})
router.get("/admin/edit", tokenServices.checkLogged, (req, res) => {
    res.render("adminEdit", {title: "Admin"})
})
router.get("/admin/remove", tokenServices.checkLogged, (req, res) => {
    res.render("adminRemove", {title: "Admin"})
})


module.exports = router
