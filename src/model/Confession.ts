import { Schema, model, models } from 'mongoose';

export interface Confession {
    description: string;
    author: Schema.Types.ObjectId;
}

const ConfessionSchema = new Schema<Confession>({
    description: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default models.Confession || model('Confession', ConfessionSchema);
