import express from 'express';
import { getRandomQuote } from '../controllers';
const router = express.Router();

router.get('/random', getRandomQuote);

export { router as quotesRouter };
