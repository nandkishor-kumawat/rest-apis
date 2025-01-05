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
exports.generateImageMessage = exports.generateTextMessage = void 0;
const ai_1 = require("ai");
const models_1 = require("../lib/models");
const constants_1 = require("../constants");
const utils_1 = require("../lib/utils");
const generateTextMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, isCode = false } = req.body;
    try {
        const result = yield (0, ai_1.generateText)({
            model: (0, models_1.google)('gemini-1.5-flash'),
            prompt: message,
            system: isCode ? constants_1.systemCodeInstruction : constants_1.systemTextInstruction,
        });
        const json = (0, utils_1.toJSON)(result.text);
        res.status(200).json(json);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.generateTextMessage = generateTextMessage;
const generateImageMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image = [], isCode = false } = req.body;
    const images = image.map((img) => ({
        type: 'image',
        image: img,
        mimeType: 'image/png',
    }));
    try {
        const result = yield (0, ai_1.generateText)({
            model: (0, models_1.google)('gemini-1.5-flash'),
            messages: [
                {
                    role: 'system',
                    content: isCode ? constants_1.systemCodeInstruction : constants_1.systemTextInstruction,
                },
                {
                    role: 'system',
                    content: 'All the given images represent the same problem',
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: isCode
                                ? 'Solve the coding problem. (write code in c++ if no language specified'
                                : 'Solve the given question',
                        },
                        ...images,
                    ],
                },
            ],
        });
        const json = (0, utils_1.toJSON)(result.text);
        res.status(200).json(json);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.generateImageMessage = generateImageMessage;
//# sourceMappingURL=chit-chat.controller.js.map