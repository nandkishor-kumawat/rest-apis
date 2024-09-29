import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mainRouter } from './routes';
import { connectToDB } from './services';
import imageUpload from 'express-fileupload';
dotenv.config();

connectToDB();

const port = process.env.PORT || 3000;

const app = express();

app.use(imageUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1', mainRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});