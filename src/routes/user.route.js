const express = require('express');
const router = express.Router();

const UserService = require('../services/users.service');
const rateLimit = require("express-rate-limit");

let userService = new UserService();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

router.post('/sign_in', limiter, async function (req, res, next) {
    try {
        const result = await userService.signIn(req.body.email, req.body.password, req.body.role);
        res.send(result);
    } catch (error) {
        return next(error);
    }
});

router.post('/sign_up', async function (req, res, next) {
    try {
        await userService.signUp(req.body.email, req.body.password, req.body.role);
        res.send(201);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;