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
exports.fileUpload = void 0;
const firebase_1 = require("../services/firebase");
const storage_1 = require("firebase-admin/storage");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const fileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.files['file'];
    if (!file) {
        res.status(400).json({ message: 'No file received' });
        return;
    }
    if (file.size > MAX_SIZE) {
        res.status(400).json({ message: 'File too large, Max file-size: 5MB' });
        return;
    }
    const fileName = `${file.name}_${Date.now()}`;
    try {
        const blob = firebase_1.bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).send({ message: 'Error uploading file.', error: err });
        });
        blobStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            const publicUrl = yield (0, storage_1.getDownloadURL)(blob);
            res.status(200).send({ message: 'File uploaded successfully', url: publicUrl });
        }));
        blobStream.end(file.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error });
    }
});
exports.fileUpload = fileUpload;
//# sourceMappingURL=upload.controller.js.map