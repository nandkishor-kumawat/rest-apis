"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = void 0;
const google_1 = require("@ai-sdk/google");
exports.google = (0, google_1.createGoogleGenerativeAI)({
    apiKey: process.env.GEMINI_API_KEY,
});
//# sourceMappingURL=models.js.map