import { connectToDB } from "../../../../../../utils/database";
import Post from "../../../../../../models/post";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const GET = async (request: Request, { params }: Params) => {
  try {
    await connectToDB();

    const posts = await Post.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
