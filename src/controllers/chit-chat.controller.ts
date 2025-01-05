import { generateText } from "ai"
import { google } from "../lib/models"
import { systemCodeInstruction, systemTextInstruction } from "../constants"
import { toJSON } from "../lib/utils"
import { Request, Response } from "express"


export const generateTextMessage = async (req: Request, res: Response) => {
    const { message, isCode = false } = req.body as { message: string, isCode: boolean }
    try {
        const result = await generateText({
            model: google('gemini-1.5-flash'),
            prompt: message,
            system: isCode ? systemCodeInstruction : systemTextInstruction,
        })
        const json = toJSON(result.text)
        res.status(200).json(json)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" })
    }
}

export const generateImageMessage = async (req: Request, res: Response) => {
    const { image = [], isCode = false } = req.body as { image: string[], isCode: boolean };

    const images = image.map((img) => ({
        type: 'image',
        image: img,
        mimeType: 'image/png',
    })) as any[]

    try {
        const result = await generateText({
            model: google('gemini-1.5-flash'),
            messages: [
                {
                    role: 'system',
                    content: isCode ? systemCodeInstruction : systemTextInstruction,
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
        })
        const json = toJSON(result.text);
        res.status(200).json(json)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Something went wrong" })
    }
}