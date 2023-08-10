import { connectToDB } from "../../../../utils/database";
import Post from "../../../../models/post";

export const GET = async (req: Request) => {
    try {
    // We connect to the DB
        await connectToDB();
    // We search for all posts
        const posts = await Post.find({}).populate('creator');

    // Return a new Response including the stringified version of our posts
        return new Response(JSON.stringify(posts), { status: 200 }); 
    } catch (error) {
    // If an error occurs, throw a response and console log the error
        console.log(error);
        return new Response("Failed to fetch posts", { status: 500 });
    }
}