import { handleApiError } from "@/lib/apiError";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User/UserModel"

// Get user data
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 })
        }
        await connectDB();
        const user = await User.findOne({ _id: (session.user as { id: string }).id }).select("-password -__v").lean();
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 })
        }
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return handleApiError(error);
    }
}

// Update user details
export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthenticated!" }, { status: 401 })
        }
        const userId = (session?.user as { id: string }).id;
        await connectDB();
        const body = await req.json();
        const updated_user = await User.findByIdAndUpdate(userId, body,
            { new: true, runValidators: true }).select("-password -__v");
        if (!updated_user) {
            return NextResponse.json({ success: false, message: "Could not update the user!" }, { status: 500 })
        }
        return NextResponse.json({ success: true, updated_user }, { status: 200 }); 
    } catch (error) {
        console.error(error);
        return handleApiError(error);
    }
}