import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const schemaOptions = { timestamps: true };

const userSchema = new Schema<IUser>(
  {
    oauthId: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String },
    authProvider: { type: String, required: true, enum: ['google'] },
    friends: { type: [Schema.Types.ObjectId], ref: 'User' },
  },
  schemaOptions
);

const UserModel = model<IUser>('User', userSchema);
export { UserModel };
