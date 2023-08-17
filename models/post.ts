import { Model, Schema, model, models, Document } from 'mongoose';
import { UserDocument } from './user';

interface Post {
    creator: UserDocument;
    prompt: string;
    tag: string;
}

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

export interface PostDocument extends Post, Document {}

export interface PostModel extends Model<PostDocument> {}

const Post = models.Post || model("Post", PostSchema);

export default Post;