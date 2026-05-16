import { handleApiError } from "@/lib/apiError";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User/UserModel"

// Get user data
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 })
        }
        console.log("session:", session)
        await connectDB();
        const user = await User.findOne({ _id: (session.user as { id: string }).id }).select("-password -__v")
        console.log("user:", user)
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 })
        }
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return handleApiError(error);
    }
}