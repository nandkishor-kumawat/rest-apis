const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1', require('./routes'));


app.listen(3000, () => {
    console.log('Server running on port 3000');
})