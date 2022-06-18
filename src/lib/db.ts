import { connect, disconnect } from 'mongoose';

export async function withDBConnection<T>(callback: () => Promise<void | T>) {
    await connect(process.env.MONGODB_URI!);
    const result = (await callback()) as T;
    await disconnect();
    return result;
}
