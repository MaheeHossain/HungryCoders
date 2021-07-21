const OrderDb = require('../models/Order')

/**
 * This method implements the logic to getAllOrders.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getAllOrders = (request, response) => {
    // Get all the orders
    OrderDb.find({}, (error, orders) => {
        if (error) {
            response.send(error)
        }
        response.send(orders)
    })
}

/**
 * This method implements the logic to getOneOrder.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getVanOrder = (request, response) => {

    // Get all the orders from a van
    OrderDb.find({vanId : request.params.id}, (error, orders) => {
        if (error) {
            response.send(error)
        }
        response.send(orders)
    })
}

/**
 * This method implements the logic to getOneOrder.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const getUserOrders = (request, response) => {

    // Get all the orders for a user
    OrderDb.find({userId : request.params.userId}, (error, orders) => {
        if (error) {
            response.send(error)
        }
        response.send(orders)
    })
}

/**
 * This method implements the logic to placeOrder.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const placeOrder = (request, response) => {

    // Store in the database
    OrderDb.insert(request.body, (error, savedOrder) => {
        if (error) {
            response.send(error)
        }
        response.send(savedOrder)
    })
}

/**
 * This method implements the logic to setStatus.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const setStatus = (request, response) => {
    OrderDb.update({_id: request.params.id}, { $set: { status:  request.params.status } }, { multi: true }, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send("Set the status to " + request.params.status)
    })
}

/**
 * This method implements the logic to deleteOrder.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const deleteOrder = (request, response) => {
    // Deleting the items
    OrderDb.remove({_id: request.params.id}, (error, deletedOrder) => {
        if (error) {
            response.sendStatus(400)
        }
        response.send("Deleted order item " + request.params.id)
    })
}

/**
 * Post customer's rating.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const postReview = (request, response) => {
  console.log(request.body.rating, request.body.comment);
  OrderDb.update({_id: request.params.id}, { $set: {rating:  request.body.rating, comment: request.body.comment} }, { multi: true }, (error, orders) => {

      if (error) {
          response.send(error)
      }
      if (orders===1) {
          response.send("Set the rating to " + request.body.rating)
      }
      else if (orders===0) {
          response.status(401).send("Order does not exist")
      }
      else{
          response.status(401).send("ERROR")
      }
  })
}

// export the controller functions
module.exports = {
    getAllOrders, 
    getVanOrder,  
    getUserOrders, 
    placeOrder, 
    setStatus, 
    deleteOrder, 
    postReview
}