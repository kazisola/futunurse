import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    fullName: string;
    email: string;
    password?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);