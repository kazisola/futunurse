import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { CompanionSaved } from "@/models/Companion/CompanionSavedModel";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 });
        }
        const userId = (session.user as { id: string }).id;
        const saved_cards = await CompanionSaved.find({ user: userId }).sort({ createdAt: -1 }).select("query type").lean();

        return NextResponse.json({ success: true, saved_cards }, { status: 200 })
    } catch (error) {
        console.log(error);
        return handleApiError(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 });
        }
        const userId = (session.user as { id: string }).id;

        const { query, type, card } = await req.json();

        const existing = await CompanionSaved.findOne({ user: userId, query, type })
        if (existing) {
            return NextResponse.json(
                { success: false, message: "Card already saved" },
                { status: 409 }
            );
        }

        const saved_card = await CompanionSaved.create({
            user: userId,
            query,
            type,
            card
        });

        if (!saved_card) {
            return NextResponse.json({ success: false, message: "Failed to save card!" }, { status: 500 })
        }

        return NextResponse.json({ success: true, saved_card }, { status: 201 })
    } catch (error) {
        console.log(error);
        return handleApiError(error)
    }
}