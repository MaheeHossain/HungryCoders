const MenuDb = require('../models/Menu')

/**
 * This method implements the logic to getAllMenuItems.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getAllMenuItems = (request, response) => {

    // Get all the item
    MenuDb.find({}, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send(items)
    })
}

/**
 * This method implements the logic to getItemById.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getItemById = (request, response) => {
    // Return item details
    MenuDb.find({_id: request.params.id}, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send(items)
    })
}

/**
 * This method implements the logic to createItem.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const createItem = (request, response) => {

    // Store in the database
    MenuDb.insert(request.body, (error, savedItem) => {
        if (error) {
            response.send(error)
        }
        response.send(savedItem)
    })
}

/**
 * This method implements the logic to deleteItem.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const deleteItem = (request, response) => {
    // Deleting the items
    MenuDb.remove({_id: request.params.id}, (error, deletedItem) => {
        console.log(deletedItem)
        if (error) {
            console.log(error)
            response.sendStatus(400)
        }
        response.sendStatus(200)
    })
}

module.exports = {getAllMenuItems, getItemById, createItem, deleteItem}