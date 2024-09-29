"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEMINI_API_KEY = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT;
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//# sourceMappingURL=index.js.map