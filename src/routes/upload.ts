import express from 'express';
import { fileUpload } from '../controllers';
const router = express.Router();

router.post('/upload', fileUpload);

export { router as uploadRouter };