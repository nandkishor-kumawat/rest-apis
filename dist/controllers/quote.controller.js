"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomQuote = void 0;
const schema_1 = require("../schema");
const getRandomQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quotes = yield schema_1.Quote.aggregate([{ $sample: { size: 1 } }]);
    console.log(quotes);
    const { quote, author } = quotes[0];
    res.status(200).json({ quote, author });
});
exports.getRandomQuote = getRandomQuote;
//# sourceMappingURL=quote.controller.js.map