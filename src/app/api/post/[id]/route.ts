import { connectToDB } from "../../../../../utils/database";
import Post from "../../../../../models/post";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// GET to find the post
export const GET = async (request: Request, { params }: Params) => {
  try {
    // Connect to the DB
    await connectToDB();
    // Find the post by ID
    const post = await Post.findById(params.id).populate("creator");
    // If no post is found, return a response with a 404
    if (!post) return new Response("Post not found", { status: 404 });
    // else, return the stringified JSON of post with a success status
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    // If error, console log it and return a response with a status 500
    console.log(error);
    throw new Response("Failed to find post", { status: 500 });
  }
};

// PATCH to update the post
export const PATCH = async (request: Request, { params }: Params) => {
    const { prompt, tag } = await request.json();

    try {
        // connect to the DB
        await connectToDB();
        // find the post by ID
        const post = await Post.findById(params.id);
        // if no post is found, return a response with a 404
        if (!post) return new Response("Post not found", { status: 404 });

        // If found, update its changed values
        post.prompt = prompt;
        post.tag = tag;
        // If everything checks out, save the post in the DB
        await post.save();
        // and return the stringified JSON of post with a success status
        return new Response(JSON.stringify(post), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to update the post", { status: 500 })
    }
};

// DELETE to delete the post object
export const DELETE = async (request: Request, { params }: Params) => {
    try {
        await connectToDB();
        const post = await Post.findById(params.id);
        if (!post) return new Response("Post not found", { status: 404 });
        // If found, delete the post (there's also the method findByIdAndRemove(params.id))
        await post.delete();
        // if everything checks out, delete the post and return a success message with a success status
        return new Response("Post successfully deleted", { status: 200 });
    } catch (error) {
        // If error, console log it and return a response with a status 500
        console.log(error);
        return new Response("Failed to delete the post", { status: 500 })
    }
};
