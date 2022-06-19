import { Schema, model, models, Document } from 'mongoose';

export interface Confession {
    title: string;
    description: string;
    author: string;
}

const ConfessionSchema = new Schema<Confession>({
    title: String,
    description: String,
    author: String,
});

export default models.Confession || model('Confession', ConfessionSchema);
