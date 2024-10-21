import { Account, Client, ID } from "appwrite";
import { Request, Response } from "express";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65958b581207a260b2b0");

const account = new Account(client);


export const sendOtp = async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        res.status(400).json({ error: "Phone number is required" });
        return;
    }
    const sessionToken = await account.createPhoneToken(ID.unique(), phoneNumber);
    console.log(sessionToken);
    const userId = sessionToken.userId;
    res.status(200).json({ userId });
}

export const verifyOtp = async (req: Request, res: Response) => {
    const { userId, code } = req.body;
    if (!userId || !code) {
        res.status(400).json({ error: "User ID and code are required" });
        return;
    }

    try {
        const session = await account.updatePhoneSession(userId, code);
        res.status(200).json({ session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}