import mongoose, { Document, Schema } from "mongoose";

export interface userType extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  verifyToken: string;
  verifyTokenExpiry: Date;
  resetPasswordToken: string;
  resetPasswordTokenExpiry: Date;
}

const userSchema: Schema<userType> = new Schema({
  username: {
    type: String,
    required: [true, "This field is important"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "The field not be empty"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be necessary"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
