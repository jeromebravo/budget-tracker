const express = require('express');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const {check, validationResult} = require('express-validator');
const router = express.Router();

// @route    POST /api/transaction/income
// @route    add new income
// @access   private
router.post('/income', [auth, [
    check('description', 'Description is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('date', 'Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {description, amount, date} = req.body;

    try {
        // get transaction
        const transaction = await Transaction.findOne({user: req.user.id});

        // add income
        transaction.income.unshift({description, amount, date});

        // save transaction
        await transaction.save();

        res.json(transaction.income);
    } catch(err) {
        console.error(err.message);
        res.status(400).json({msg: 'Please provide a valid date'});
    }
});

// @route    POST /api/transaction/expense
// @route    add new expense
// @access   private
router.post('/expense', [auth, [
    check('description', 'Description is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('date', 'Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {description, amount, date} = req.body;

    try {
        // get transaction
        const transaction = await Transaction.findOne({user: req.user.id});

        // add expense
        transaction.expense.unshift({description, amount, date});

        // save transaction
        await transaction.save();

        res.json(transaction.expense);
    } catch(err) {
        console.error(err.message);
        res.status(400).json({msg: 'Please provide a valid date'});
    }
});

// @route    GET /api/transaction
// @desc     get all income and expense
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({user: req.user.id}).select('income expense');
        res.json(transaction);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE /api/transaction/income/:id
// @desc     delete income
// @access   private
router.delete('/income/:id', auth, async (req, res) => {
    try {
        // get transaction
        const transaction = await Transaction.findOne({user: req.user.id}).select('income');

        // get correct index
        const index = transaction.income.map(val => val._id.toString()).indexOf(req.params.id);

        // check if income does not exist
        if(index === -1) {
            return res.status(404).json({msg: 'Income not found'});
        }

        // remove income
        transaction.income.splice(index, 1);

        // save transaction
        await transaction.save();

        res.json(transaction.income);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    DELETE /api/transaction/expense/:id
// @desc     delete expense
// @access   private
router.delete('/expense/:id', auth, async (req, res) => {
    try {
        // get transaction
        const transaction = await Transaction.findOne({user: req.user.id}).select('expense');

        // get correct index
        const index = transaction.expense.map(val => val._id.toString()).indexOf(req.params.id);

        // check if expense does not exist
        if(index === -1) {
            return res.status(404).json({msg: 'Expense not found'});
        }

        // remove expense
        transaction.expense.splice(index, 1);

        // save transaction
        await transaction.save();

        res.json(transaction.expense);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET /api/transaction/income/:id
// @desc     get income by id
// @access   private
router.get('/income/:id', auth, async (req, res) => {
    try {
        // get income
        const transaction = await Transaction.findOne({user: req.user.id}).select('income');

        // get correct index
        const index = transaction.income.map(val => val._id.toString()).indexOf(req.params.id);

        // check if income does not exist
        if(index === -1) {
            return res.status(404).json({msg: 'Income not found'});
        }

        res.json(transaction.income[index]);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    GET /api/transaction/expense/:id
// @desc     get expense by id
// @access   private
router.get('/expense/:id', auth, async (req, res) => {
    try {
        // get expense
        const transaction = await Transaction.findOne({user: req.user.id}).select('expense');

        // get correct index
        const index = transaction.expense.map(val => val._id.toString()).indexOf(req.params.id);

        // check if expense does not exist
        if(index === -1) {
            return res.status(404).json({msg: 'Expense not found'});
        }

        res.json(transaction.expense[index]);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route    PUT /api/transaction/income/:id
// @desc     update income
// @access   private
router.put('/income/:id', [auth, [
    check('description', 'Description is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('date', 'Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {description, amount, date} = req.body;

    try {
        const transaction = await Transaction.findOneAndUpdate({
            user: req.user.id,
            income: {$elemMatch: {_id: req.params.id}}
        }, {$set: {
            'income.$.description': description,
            'income.$.amount': amount,
            'income.$.date': date
        }}, {'new': true, 'safe': true});

        res.json(transaction.income);
    } catch(err) {
        console.error(err.message);

        if(err.kind === 'date') {
            return res.status(400).json({msg: 'Please provide a valid date'});
        } 

        res.status(404).json({msg: 'Income not found'});
    }
});

// @route    PUT /api/transaction/expense/:id
// @desc     update expense
// @access   private
router.put('/expense/:id', [auth, [
    check('description', 'Description is required').not().isEmpty(),
    check('amount', 'Amount must be a number').isNumeric(),
    check('date', 'Date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // deconstruct req.body
    const {description, amount, date} = req.body;

    try {
        const transaction = await Transaction.findOneAndUpdate({
            user: req.user.id,
            expense: {$elemMatch: {_id: req.params.id}}
        }, {$set: {
            'expense.$.description': description,
            'expense.$.amount': amount,
            'expense.$.date': date
        }}, {'new': true, 'safe': true});

        res.json(transaction.expense);
    } catch(err) {
        console.error(err.message);

        if(err.kind === 'date') {
            return res.status(400).json({msg: 'Please provide a valid date'});
        }

        res.status(404).json({msg: 'Expense not found'});
    }
});

module.exports = router;