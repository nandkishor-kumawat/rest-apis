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
exports.verifyOtp = exports.sendOtp = void 0;
const appwrite_1 = require("appwrite");
const client = new appwrite_1.Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65958b581207a260b2b0");
const account = new appwrite_1.Account(client);
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        res.status(400).json({ error: "Phone number is required" });
        return;
    }
    const sessionToken = yield account.createPhoneToken(appwrite_1.ID.unique(), phoneNumber);
    console.log(sessionToken);
    const userId = sessionToken.userId;
    res.status(200).json({ userId });
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, code } = req.body;
    if (!userId || !code) {
        res.status(400).json({ error: "User ID and code are required" });
        return;
    }
    try {
        const session = yield account.updatePhoneSession(userId, code);
        res.status(200).json({ session });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=auth.controller.js.map