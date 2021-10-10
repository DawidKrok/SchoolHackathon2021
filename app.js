const app = require("./loaders/express")
const mainRouter = require("./routers/mainRoutes")
const dataRouter = require("./routers/dataRoutes")
const adminRouter = require("./routers/adminRoutes")

app.use(mainRouter)
app.use(dataRouter)
app.use(adminRouter)

// When nothing else handled request
app.use((req, res) => {
    res.status(404).render("404", {title: "Status 404"})
})