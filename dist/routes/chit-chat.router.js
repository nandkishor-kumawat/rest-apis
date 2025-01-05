"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chitChatRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.chitChatRouter = router;
router.post('/solve/text', controllers_1.generateTextMessage);
router.post('/solve/image', controllers_1.generateImageMessage);
//# sourceMappingURL=chit-chat.router.js.map