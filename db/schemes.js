const { ObjectId } = require("bson")
const mongoose = require("mongoose")

// Schemas for unification of documents inside database
const placeSchema = new mongoose.Schema({    
    name: {
        type: String,
        unique: false,
    },
    type: {
        type: String,
        unique: false,
    },
    description: String,
    map_url: String,
    game_url: String
}, {
    versionKey: false
})

const eventSchema = new mongoose.Schema({    
    title: {
        type: String,
        unique: false,
    },
    published_on: {
        type: Date,
        unique: false,
    },
    takes_place_on: {
        type: Date,
        unique: false,
    },
    img_link: {
        type: String,
        unique: false,
    },
    description: String,
}, {
    versionKey: false
})

const suggestionSchema =  new mongoose.Schema({    
    title: {
        type: String,
        unique: false,
    },
    description: String,
}, {
    versionKey: false
})

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    }
}, {
    versionKey: false
})

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        unique: true
    }
}, {
    versionKey: false
})


// models with declared Schema
const Place = new mongoose.model("Place", placeSchema)
const Event = new mongoose.model("Event", eventSchema)
const Suggestion = new mongoose.model("Suggestion", suggestionSchema)
const Admin = new mongoose.model("Admin", adminSchema)
const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema)

module.exports = {
    Place,
    Event,
    Suggestion,
    Admin,
    RefreshToken
} 