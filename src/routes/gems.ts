import express from 'express';
import multer from 'multer';
import { genrateVisionProContent, sendMessage, } from '../controllers';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/text', sendMessage);
router.post('/vision', genrateVisionProContent);


export { router as gemsRouter };