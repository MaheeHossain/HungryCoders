const router = require('express').Router();
const {getAllVans, getOneVan, createVan, setVanStatus, deleteVan, changeLocation, changeMessage} 
= require('../controllers/vanController')

// Access van resources
router.get('/all', getAllVans)
router.get('/find/:_id', getOneVan)
router.post('/create', createVan)
router.post('/setstatus/:_id', setVanStatus)
router.delete('/delete/:_id', deleteVan)
router.get('/changeLocation/:_id/:lat/:lon', changeLocation)
router.get('/changeMessage/:_id/:message', changeMessage)


module.exports = router;
