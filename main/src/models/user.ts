import { ObjectId, Schema, model, Document } from "mongoose";
// import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  friends: ObjectId[];
  thoughts: ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('frienCount')
.get(function () {
  return this.friends.length
})

const User = model("User", userSchema);

export default User;
