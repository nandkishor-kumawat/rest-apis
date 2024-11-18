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
exports.genrateVisionProContent = exports.sendMessage = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../config");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.GEMINI_API_KEY);
const safetySettings = [
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];
const MODELS = {
    PRO: 'text-pro',
    VISION: 'vision-pro',
    FLASH: "gemini-1.5-flash"
};
const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};
// export const sendMessage2 = async (req: Request, res: Response) => {
//     const message = req.body?.message;
//     if (!message) {
//         res.status(400).json({ error: "Message is required" });
//         return;
//     }
//     const result = await generateObject({
//         model: google('gemini-1.5-flash', {
//             structuredOutputs: false,
//         }),
//         schema: z.object({
//             text: z.string(),
//             question: z.string(),
//             image: z.nullable(z.string()),
//             answer: z.nullable(z.string()),
//             code: z.nullable(z.string()),
//         }),
//         prompt: message,
//         system: "you have to give response in the json format like {text: 'your response', question:'prompt', image?: 'base64', answer:'final answer or return null if it has code', code: 'code snippet only or null'}"
//     });
//     console.log(result.object);
//     res.status(200).json({ text: result.object });
// }
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const model = genAI.getGenerativeModel({ model: MODELS.FLASH });
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
    }
    try {
        const result = yield model.generateContent({
            systemInstruction: "you have to give response in the json format like {text: 'your response', question:'prompt',  answer:'final answer or return 'undefined'', code: 'code snippet without comments or 'undefined''}",
            contents: [{
                    role: "user",
                    parts: [{ text: message }],
                }],
        });
        const text = result.response.text();
        const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        console.log(json);
        res.status(200).json({ text: json });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.sendMessage = sendMessage;
function fileToGenerativePart(file) {
    if (typeof file === 'string') {
        return {
            inlineData: {
                data: file,
                mimeType: "image/png"
            },
        };
    }
    return {
        inlineData: {
            data: Buffer.from(file.data).toString("base64"),
            mimeType: file.mimetype
        },
    };
}
const genrateVisionProContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const file = req.files['files'];
    var _a;
    // if (!file) {
    //     res.status(400).json({ error: "File is required" });
    //     return
    // }
    // const imagepart = (Array.isArray(file) ? file : [file]).map(fileToGenerativePart);
    const file = (_a = req.body) === null || _a === void 0 ? void 0 : _a.file;
    const model = genAI.getGenerativeModel({ model: MODELS.FLASH });
    // const { message } = req.body;
    const message = "You have given a picture, read the image and get the answer of the question available in the image and return the response if it is a coding question complete the code in cpp ";
    try {
        const result = yield model.generateContent({
            systemInstruction: "you have to give response in the json format like {text: 'your response', question:'prompt', answer:'final answer or return 'undefined'', code: 'code snippet without comments or 'undefined''}",
            contents: [{
                    role: "user",
                    parts: [
                        { text: "Give answer to image or write code if a coding problem" },
                        {
                            inlineData: {
                                data: file.split(",")[1],
                                mimeType: "image/png"
                            },
                        }
                    ],
                }],
        });
        const text = result.response.text();
        const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        console.log(json);
        res.status(200).json({ text: json });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.genrateVisionProContent = genrateVisionProContent;
//# sourceMappingURL=gems.controller.js.map