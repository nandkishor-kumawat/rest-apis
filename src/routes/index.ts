import { gemsRouter } from "./gems";
import { quotesRouter } from "./quotes";

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.use('/quotes', quotesRouter);
router.use('/gems', gemsRouter);

export { router as mainRouter };