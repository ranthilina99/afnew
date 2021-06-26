const express = require('express');
const router = express.Router();
const controller = require('../controller/UserController');
const auth =require('../middleware/auth/auth');

module.exports = function () {
    router.get('/', auth,controller.getSpecificUser);
    // router.post('/admin_register',controller.adminAddUsers );
    router.post('/login',controller.loginUser );
    router.post('/register',controller.addUsers );
    return router;
}