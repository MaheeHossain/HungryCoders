const UserDb = require('../models/User')
const crypto = require('crypto')
let salt = 'f844b09ff50c'

/* BE VERY CAREFUL ABOUT CHECK EMAIL AND LOGIN FUNCTIONS, CUST/VEN SPLIT MAY HAVE BUGS */

/**
 * This method implements the logic to getAllUsers.
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getAllUsers = (request, response) => {
    // Get all the users
    UserDb.find({}, (error, items) => {
        if (error) {
            response.send(error)
        }
        response.send(items)
    })
}

/**
 * This method implements the logic to getOneUser.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const getOneUser = (request, response) => {

    // Get all the item
    UserDb.find({_id : request.params.id}, (error, user) => {
        if (error) {
            response.send(error)
        }
        if (user.length===1) {
            response.send(user)
        }
        else if (user.length===0) {
            response.status(401).send("User not found")
        }
        else{
            response.status(401).send("ERROR")
        }
    })
}

/**
 * This method implements the logic to checkEmailCust.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const checkEmailCust = (request, response) => {

    // Return login details
    UserDb.find({email: request.params.email}, (error, user) => {
        if (error) {
            response.send(error)
        }
        
        // If more than two accounts with the email, error
        if (user.length>2) {
            response.status(401).send("Multiple accounts with same email");
        } 
        
        // If two accounts with the email, one is customer, one is vendor
        else if (user.length===2) {
            response.status(401).send("Email already in use");
        } 
        
        else if (user.length===1) {
            // If email is used for vendor account, customer account is fine
            if (user.usertype==='vendor') {
                response.send("Email works")
            }
            // If email is used for admin or customer account, not eligible
            else {
                response.status(401).send("Email already in use");
            }
        } 
        // If email is used for no accounts, all good
        else {
            response.send("Email works")
        }
    })
}

/**
 * This method implements the logic to checkEmailVen.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const checkEmailVen = (request, response) => {

    // Return login details
    UserDb.find({email: request.params.email}, (error, user) => {
        if (error) {
            response.send(error)
        }
        
        if (user.length>2) {
            response.status(401).send("Multiple accounts with same email");
        } 
        else if (user.length===2) {
            response.status(401).send("Email already in use");
        } 
        else if (user.length===1) {
            if (user.usertype==='customer') {
                response.send("Email works")
            }
            else {
                response.status(401).send("Email already in use");
            }
        } 
        else {
            response.send("Email works")
        }
    })
}

/**
 * Finds the user with the given email in params and returns true if found
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const checkLoginCust = async(request, response) => {

    // Return login details
    UserDb.find({email: request.params.email, password: crypto.pbkdf2Sync(request.params.password, salt,  
        1000, 64, `sha512`).toString(`hex`)}, (error, user) => {
        if (error) {
            response.send(error)
        }
        
        if (user.length===1) {
            // If only account matching is a vendor account, no login
            if (user[0].usertype==='vendor') {
                response.status(401).send("Wrong email or password")
            }
            else {
                response.send(user);
            }
        } else if (user.length===2) {
            // If two accounts with same email/password exist, 
            // check if either is a customer/admin account
            if (user[0].usertype!='vendor') {
                response.send(user);
            } else if (user[1].usertype!='vendor') {
                response.send(user);
            } else {
                response.status(401).send("Wrong email or password")
            }
        } else {
            response.status(401).send("Wrong email or password")
        }
    })
}

/**
 * Finds the user(vendor or admin) with the given email in params and returns true if found
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const checkLoginVen = async(request, response) => {

    // Return login details
    UserDb.find({email: request.params.email, password: crypto.pbkdf2Sync(request.params.password, salt,  
        1000, 64, `sha512`).toString(`hex`)}, (error, user) => {
        if (error) {
            response.send(error)
        }
        
        if (user.length===1) {
            if (user[0].usertype==='customer') {
                response.status(401).send("Wrong email or password")
            }
            else {
                response.send(user);
            }
        } else if (user.length===2) {
            if (user[0].usertype!='customer') {
                response.send(user);
            } else if (user[1].usertype!='customer') {
                response.send(user);
            } else {
                response.status(401).send("Wrong email or password")
            }
        }else {
            response.status(401).send("Wrong email or password")
        }
    })
}

/**
 * This method implements the logic to changePassword.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const changePassword = (request, response) => {
    UserDb.update({_id: request.params.id}, { $set: { password:  request.params.password } }, { multi: true }, (error, users) => {
        if (error) {
            response.send(error)
        }
        console.log(users)
        if (users===1) {
            response.send("Set the password to " + request.params.password)
        }
        else if (users===0) {
            response.status(401).send("Wrong email or password")
        }
        else{
            response.status(401).send("ERROR")
        }
    })
}

/**
 * This method implements the logic to placeUser.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const createUser = async (request, response) => {

    request.body.password = crypto.pbkdf2Sync(request.body.password, salt,  
        1000, 64, `sha512`).toString(`hex`);

    // Store in the database
    UserDb.insert(request.body, (error, savedItem) => {
        if (error) {
            response.send(error)
        }
        response.send(savedItem)
    })
}


/**
 * This method implements the logic to accountDetails.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const updateAccount = (request, response) => {
    UserDb.update({_id: request.body._id}, {$set: request.body}, {returnUpdatedDocs: true, multi: false},(error, num, user) => {
        if (error) {
            response.status(400).send("Can't update the user")
        } else {
            response.status(200).send(user);
        }
    })
}

/**
 * This method implements the logic to deleteUser.
 * 
 * @param {*} request 
 * @param {*} response 
 */
 const deleteUser = (request, response) => {
    // Deleting the items
    UserDb.remove({_id: request.params.id}, (error, deletedUser) => {
        if (error) {
            response.sendStatus(400)
        }
        response.send("Deleted user" + request.params.id)
    })
}

// export the controller functions
module.exports = {
    getAllUsers, 
    getOneUser, 
    checkLoginCust,
    checkLoginVen,
    changePassword,
    createUser,
    deleteUser, 
    checkEmailCust,
    checkEmailVen,
    updateAccount
}

