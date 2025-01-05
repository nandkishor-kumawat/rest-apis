"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const auth_1 = require("./auth");
const quotes_1 = require("./quotes");
const express_1 = __importDefault(require("express"));
const upload_1 = require("./upload");
const chit_chat_router_1 = require("./chit-chat.router");
const router = express_1.default.Router();
exports.mainRouter = router;
router.get('/', (req, res) => {
    res.send('Hello World');
});
router.use('/quotes', quotes_1.quotesRouter);
router.use('/auth', auth_1.authRouter);
router.use('/file', upload_1.uploadRouter);
router.use('/chit-chat', chit_chat_router_1.chitChatRouter);
//# sourceMappingURL=index.js.map