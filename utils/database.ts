import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Successfully connected')
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
        })

        isConnected = true;
        console.log('Successfully connected');


    } catch(error) {
        console.log(error);
    }
}