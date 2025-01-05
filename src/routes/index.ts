import { authRouter } from "./auth";
import { quotesRouter } from "./quotes";
import express from 'express';
import { uploadRouter } from "./upload";
import { chitChatRouter } from "./chit-chat.router";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.use('/quotes', quotesRouter);
router.use('/auth', authRouter);
router.use('/file', uploadRouter)
router.use('/chit-chat', chitChatRouter)

export { router as mainRouter };