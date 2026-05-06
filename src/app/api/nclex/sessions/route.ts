import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { RecentSession } from "@/models/NCLEX/RecentSessionModel";

// GET RECENT NCLEX SESSIONS
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthenticated!" }, { status: 401 });
        }
        const recentSessions = await RecentSession.find({ user: (session.user as { id: string }).id });
        return NextResponse.json({ success: true, recentSessions }, { status: 200 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

// SAVE NCLEX SESSION
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
        }
        const body = await req.json();
        const { category, totalQuestions, correctAnswers, score, date, performanceAnalysis, studyRecommendations } = body || {};
        if (!category || !totalQuestions) {
            return NextResponse.json({ success: false, message: "Fields required" }, { status: 400 });
        }
        const newSession = await RecentSession.create({
            user: (session.user as { id: string }).id,
            category,
            totalQuestions,
            correctAnswers,
            score,
            date,
            performanceAnalysis,
            studyRecommendations
        });
        if (!newSession) {
            return NextResponse.json({ success: false, message: "Failed to save recent session" }, { status: 400 })
        }
        return NextResponse.json({ success: true, message: "Saved NCLEX prep session result!" }, { status: 201 });
    } catch (error) {
        console.log(error)
        return handleApiError(error);
    }
}