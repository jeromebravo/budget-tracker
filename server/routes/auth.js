const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router();

// @route    POST /api/auth/register
// @desc     register user
// @access   public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});

        // check if user already exist
        if(user) {
            return res.status(400).json({errors: [{msg: 'User with the same email already exist'}]});
        }

        // create user object
        user = {name, email, password};

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user in database
        user = await User.create(user);

        // create transaction
        await Transaction.create({user: user.id});

        // create payload object
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.json({user: payload.user, token});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    POST /api/auth/login
// @desc     login user
// @access   public
router.post('/login', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        // check if user does not exist
        if(!user) {
            return res.status(400).json({errors: [{msg: 'Incorrect email or password'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        // check if password is incorrect
        if(!isMatch) {
            return res.status(400).json({errors: [{msg: 'Incorrect email or password'}]});
        }

        // create payload object
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        // create token
        const token = jwt.sign(payload, config.get('jwtSecret'));

        res.json({user: payload.user, token});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;