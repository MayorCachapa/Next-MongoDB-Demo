import { connectToDB } from "../../../../../utils/database";
import Post from "../../../../../models/post";

export const POST = async (req: Request) => {
    try {
        // We receive the request and destructure the values from the request body
        const { userId, prompt, tag } = await req.json()
        // We connect with the DB
        await connectToDB();
        // Call for a new instance of POST
        const newPost = new Post({
        // Pass in the fields of Post destrcutured from the request body 
            creator: userId,
            tag: tag,
            prompt: prompt 
        })
        // If all checks out, save the instance to the database
        await newPost.save();
        // Return a new response with the new Post and a success status

        return new Response(JSON.stringify(newPost), { status: 201 })

    } catch (error) {
        // If an error occurs, console log it
        console.log(error)
        // Return a response with a string message and a fail status
        
        return new Response('Failed to create a new Post', { status: 500 })
    }
}