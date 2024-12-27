import { authRouter } from "./auth";
import { gemsRouter } from "./gems";
import { quotesRouter } from "./quotes";
import express from 'express';
import { uploadRouter } from "./upload";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.use('/quotes', quotesRouter);
router.use('/gems', gemsRouter);
router.use('/auth', authRouter);
router.use('/file', uploadRouter)

export { router as mainRouter };