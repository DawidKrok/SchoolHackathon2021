const mongoose = require('mongoose')

const url = "mongodb://XXXX:XXXX/XXXX"

mongoose.connect(url, {
    // some settings for better mongoose performance
    useNewUrlParser: true,
    useUnifiedTopology: true
})