import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter a valid email"],
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
        match: [/^(?=(?:\D*\d){0,3}\D*$)[a-zA-Z0-9\-_.]{8,20}$/, 'Username must contain 8 to 20 alphanumeric characters and be unique!' ]
    },
    image: {
        type: String,
    }
});

/* 
If we were using a typical framework like Express, we could only export the model and the schema as variables.
Because of Next13's nature of routing, the backend only gets activated when the route is accessed. To prevent creating
several instances of the same user, we first call models, which is an object from Mongoose. It essentially
stores all the models generated for this schema.
*/

const User = models.User || model("User", UserSchema);

export default User;