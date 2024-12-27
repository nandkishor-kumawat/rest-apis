import express from 'express';
import { genrateVisionProContent, sendMessage, } from '../controllers';

const router = express.Router();

router.post('/text', sendMessage);
router.post('/vision', genrateVisionProContent);


export { router as gemsRouter };