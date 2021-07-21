const VanDb = require('../models/Van')

/**
 * Get all the vans.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getAllVans = (request, response) => {

    // Get all the item
    VanDb.find({}, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send(items)
    })
}

/**
 * This method implements the logic to getOneVan.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const getOneVan = (request, response) => {

    // Get all the item
    VanDb.find({_id : request.params._id}, (error, van) => {
        if (error) {
            response.send(error)
        }
        if (van.length===1) {
            response.send(van)
        }
        else if (van.length===0) {
            response.status(401).send("Van not found")
        }
        else{
            response.status(401).send("ERROR")
        }
    })
}

/**
 * Create a new van.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const createVan = (request, response) => {

    // Store in the database
    VanDb.insert(request.body, (error, savedItem) => {
        if (error) {
            response.send(error)
        }
        response.send(savedItem)
    })
}

/**
 * Change the van status to a location.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const setVanStatus = (request, response) => {

    // Get all the item
    VanDb.update({_id: request.params.id}, { $set: { location:  request.body.location, active:  request.body.active} }, { multi: true }, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send("Set the localtion to " + request.body.location)
    })
}

/**
 * This method implements the logic to deleteVan.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const deleteVan = (request, response) => {
    // Deleting the van
    VanDb.remove({_id: request.params._id}, (error, deletedVan) => {
        if (error) {
            response.sendStatus(400)
        }
        response.send("Deleted van " + request.params._id)
    })
}


/**
 * Change location.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const changeLocation = (request, response) => {
    // Change Location
    VanDb.update({_id: request.params._id}, { $set: { location:  [parseFloat(request.params.lat), parseFloat(request.params.lon)]} }, { multi: true }, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send("Set the location to " + [request.params.lat, request.params.lon])
    })
}

/**
 * Change message.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const changeMessage = (request, response) => {
    // Change Message
    VanDb.update({_id: request.params._id}, { $set: { message:  request.params.message} }, { multi: true }, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send("Set the message to " + request.params.message)
    })

}

module.exports = {
    getAllVans,
    getOneVan,
    createVan, 
    setVanStatus,
    deleteVan,
    changeLocation,
    changeMessage
}