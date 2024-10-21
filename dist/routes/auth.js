"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/send-otp', controllers_1.sendOtp);
router.post('/verify-otp', controllers_1.verifyOtp);
//# sourceMappingURL=auth.js.map