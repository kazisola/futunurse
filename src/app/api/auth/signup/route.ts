import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User/UserModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
     await connectDB();
     try {
        const { fullName, email, password, confirmPassword } = await req.json();
        if(!fullName || !email || !password || !confirmPassword) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 422 });
        }
        const passwordMatches = password === confirmPassword;
        if(!passwordMatches) {
            return NextResponse.json({ success: false, message: "Confirm password do not match" }, { status: 400 });
        }
        const user = await User.findOne({ email });
        if(user) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password: hashedPassword
        });
        return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
     } catch (error) {
        return handleApiError(error)
     }
}