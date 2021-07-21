const router = require('express').Router();
const {
    getAllUsers, 
    createUser,
    deleteUser, 
    checkLoginCust,
    checkLoginVen,
    changePassword,
    getOneUser, 
    checkEmailCust,
    checkEmailVen,
    updateAccount
} 
= require('../controllers/userController')

// Https requests CRUD order resources
router.get('/all', getAllUsers)
router.get('/find/:id', getOneUser)
router.get('/checkLogin/:email/:password', checkLoginCust)
router.get('/checkLoginVen/:email/:password', checkLoginVen)
router.get('/newPassword/:id/:password', changePassword)
router.get('/checkEmail/:email', checkEmailCust)
router.get('/checkEmailVen/:email', checkEmailVen)
router.post('/createUser', createUser)
router.post('/update', updateAccount)
router.delete('/delete/:id', deleteUser)

module.exports = router;
