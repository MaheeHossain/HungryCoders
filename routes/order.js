const router = require('express').Router();
const {
    getAllOrders, 
    getVanOrder, 
    getUserOrders, 
    placeOrder, 
    setStatus, 
    deleteOrder, 
    postReview
} 
= require('../controllers/orderController')

// Https requests CRUD order resources
router.get('/all', getAllOrders)
router.get('/vanid/:id', getVanOrder)
router.get('/userOrders/:userId', getUserOrders)
router.get('/setstatus/:id/:status', setStatus)
router.post('/placement', placeOrder)
router.delete('/item/:id', deleteOrder)
router.put('/review/:id/', postReview)

module.exports = router;