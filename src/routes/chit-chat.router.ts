import express from 'express';
import { generateImageMessage, generateTextMessage } from '../controllers';
const router = express.Router();

router.post('/solve/text', generateTextMessage);
router.post('/solve/image', generateImageMessage);

export { router as chitChatRouter };