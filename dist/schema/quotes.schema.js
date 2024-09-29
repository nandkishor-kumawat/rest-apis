"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const quoteSchema = new mongoose_1.default.Schema({
    quote: { type: String, required: true },
    author: { type: String, },
});
const Quote = mongoose_1.default.model('quotes', quoteSchema);
exports.Quote = Quote;
//# sourceMappingURL=quotes.schema.js.map