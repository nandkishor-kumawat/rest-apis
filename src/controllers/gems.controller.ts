import fs from "fs";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { Request, Response } from "express";
import { GEMINI_API_KEY } from "../config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const MODELS = {
    PRO: 'text-pro',
    VISION: 'vision-pro',
    FLASH: "gemini-1.5-flash"
}

const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
};

export const sendMessage = async (req: Request, res: Response) => {
    const model = genAI.getGenerativeModel({ model: MODELS.FLASH });
    const message = req.body?.message;

    if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
    }

    try {
        const result = await model.generateContent(message);
        const text = result.response.text();
        console.log(text)
        res.status(200).json({ text });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

function fileToGenerativePart(path: string, mimeType: string) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

export const genrateVisionProContent = async (req: Request, res: Response) => {

    const file = req.file;
    if (!file) {
        res.status(400).json({ error: "File is required" });
        return
    }

    const imagepart = fileToGenerativePart(file.path, file.mimetype);
    const model = genAI.getGenerativeModel({ model: MODELS.FLASH });

    // const { message } = req.body;
    const message = "You have given a picture, read the image and get the answer of the question available in the image and return the response if it is a coding question complete the code in cpp ";

    try {
        const result = await model.generateContent([message, imagepart]);
        const response = result.response.text();
        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}