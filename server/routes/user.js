const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// @route    GET /api/user
// @desc     get current user
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email');
        res.json({id: user.id, name: user.name, email: user.email});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;