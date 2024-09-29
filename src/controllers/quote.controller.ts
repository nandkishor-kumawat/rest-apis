import { Request, Response } from "express";
import { Quote } from "../schema";

export const getRandomQuote = async (req: Request, res: Response) => {
    const quotes = await Quote.aggregate([{ $sample: { size: 1 } }])
    console.log(quotes)
    const { quote, author } = quotes[0];
    res.status(200).json({ quote, author });
};