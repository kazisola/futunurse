import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { RecentSession } from "@/models/NCLEX/RecentSessionModel";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthenticated!" }, { status: 401 });
        }
        const performance_categorized = await RecentSession.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId((session.user as { id: string }).id) }
            },
            {
                $group: {
                    _id: "$category",
                    totalQuestions: { $sum: "$totalQuestions" },
                    totalCorrect: { $sum: "$correctAnswers" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalQuestions: 1,
                    accuracy: {
                        $cond: [
                            { $eq: ["$totalQuestions", 0] },
                            0,
                            { $multiply: [{ $divide: ["$totalCorrect", "$totalQuestions"] }, 100] }
                        ]
                    }
                }
            },
            { $sort: { category: 1 } }
        ]);
        return NextResponse.json({ success: true, performance_categorized }, { status: 200 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}