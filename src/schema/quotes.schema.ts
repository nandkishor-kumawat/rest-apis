import mongoose from 'mongoose';

interface Quote extends mongoose.Document {
    quote: string;
    author: string;
}

const quoteSchema = new mongoose.Schema({
    quote: { type: String, required: true },
    author: { type: String, },
})

const Quote = mongoose.model<Quote>('quotes', quoteSchema);

export { Quote };