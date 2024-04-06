const express = require('express');
const router = express.Router();
const Quote = require('../schema/quotes.schema');

router.get('/random', async(req, res) => {
    const quote = await Quote.aggregate([{ $sample: { size: 1 } }])
    res.json(quote[0])
})

module.exports = router