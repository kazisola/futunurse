import { IUser } from "@/types/User";
import mongoose, { Document } from "mongoose";

interface IUserDocument extends IUser, Document {
    password?: string;
}

const userSchema = new mongoose.Schema<IUserDocument>({
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
    },
    program_type: {
        type: String,
        enum: ["ADN", "BSN", "LPN", "ABSN"]
    },
    expected_graduation: {
        type: String
    },
    school: {
        type: String
    }

}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);