const express = require('express');
const router = express.Router();
const Quote = require('../schema/quotes.schema');

router.get('/random', async(req, res) => {
    const quotes = await Quote.aggregate([{ $sample: { size: 1 } }])
    const { quote, author } = quotes[0]
    res.json({ quote, author })
})

module.exports = router