"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const auth_1 = require("./auth");
const gems_1 = require("./gems");
const quotes_1 = require("./quotes");
const express_1 = __importDefault(require("express"));
const upload_1 = require("./upload");
const router = express_1.default.Router();
exports.mainRouter = router;
router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/quotes', quotes_1.quotesRouter);
router.use('/gems', gems_1.gemsRouter);
router.use('/auth', auth_1.authRouter);
router.use('/file', upload_1.uploadRouter);
//# sourceMappingURL=index.js.map