"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const gems_1 = require("./gems");
const quotes_1 = require("./quotes");
const express = require('express');
const router = express.Router();
exports.mainRouter = router;
router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/quotes', quotes_1.quotesRouter);
router.use('/gems', gems_1.gemsRouter);
//# sourceMappingURL=index.js.map