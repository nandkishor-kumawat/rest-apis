const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.use('/quotes', require('./quotes'));

module.exports = router;