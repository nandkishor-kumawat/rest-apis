import { Request, Response } from "express";
import { bucket } from "../services/firebase";
import { getDownloadURL } from "firebase-admin/storage";
import { UploadedFile } from "express-fileupload";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const fileUpload = async (req: Request, res: Response) => {
    const file = req.files['file'] as UploadedFile;

    if (!file) {
        res.status(400).json({ message: 'No file received' });
        return
    }

    if (file.size > MAX_SIZE) {
        res.status(400).json({ message: 'File too large, Max file-size: 5MB' });
        return
    }

    const fileName = `${file.name}_${Date.now()}`;
    try {
        const blob = bucket.file(fileName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).send({ message: 'Error uploading file.', error: err });
        });

        blobStream.on('finish', async () => {
            const publicUrl = await getDownloadURL(blob);
            res.status(200).send({ message: 'File uploaded successfully', url: publicUrl });
        });

        blobStream.end(file.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error', error });
    }
}