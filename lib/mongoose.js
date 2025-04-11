import mongoose from 'mongoose';

export default function Connect () {
    if (mongoose.connections.readyState === 1) {
        return mongoose.connection.asPromise()
    } else {
        const uri = process.env.MONGODB_URI;
        return mongoose.connect(uri)
    }
}