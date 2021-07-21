const router = require('express').Router();
const {getAllMenuItems, getItemById, createItem, deleteItem} 
= require('../controllers/menuController')

// Https requests CRUD menu resources
router.get('/all', getAllMenuItems)
router.get('/item/:id', getItemById)
router.post('/item', createItem)
router.delete('/item/:id', deleteItem)

module.exports = router;