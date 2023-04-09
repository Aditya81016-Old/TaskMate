import { Schema, model, Document } from 'mongoose';

export interface UserInterface {
    name: string;
    email: string;
    password: string;
}

export interface UserDocument extends UserInterface, Document {}


// Define the user schema
const userSchema = new Schema<UserInterface>({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });


// Create the user model
const User = model<UserDocument>('User', userSchema);



export default User;
