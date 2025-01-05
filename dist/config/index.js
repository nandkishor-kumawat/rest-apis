"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIREBASE_STORAGE_BUCKET = exports.FIREBASE_PRIVATE_KEY = exports.FIREBASE_CLIENT_EMAIL = exports.FIREBASE_PROJECT_ID = exports.GEMINI_API_KEY = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.PORT = process.env.PORT;
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
exports.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
exports.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
exports.FIREBASE_PRIVATE_KEY = (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n');
exports.FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
//# sourceMappingURL=index.js.map