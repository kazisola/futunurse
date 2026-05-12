import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CompanionSaved } from "@/models/Companion/CompanionSavedModel";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 });
        }
        const { id } = await params;
        const userId = (session.user as { id: string }).id;
        const card = await CompanionSaved.findOne({ _id: id, user: userId }).select("card -_id").lean();

        return NextResponse.json({ success: true, card }, { status: 200 })
    } catch (error) {
        console.log(error);
        return handleApiError(error)
    }
}