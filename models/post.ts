import { Schema, model, models } from 'mongoose';


const PostSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Please enter prompt"],

    },
    tag: {
        type: String,
        required: [true, "Please enter a tag"],
    }
});

const Post = models.Post || model("Post", PostSchema);

export default Post;