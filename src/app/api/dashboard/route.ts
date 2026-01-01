import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { CarePlan } from "@/models/PatientCarePlan/PatientCarePlanModel";
import { RecentSession } from "@/models/NCLEX/RecentSessionModel";
import { generateAISuggestions } from "@/lib/generateAISuggestions";

type CompletedSession = {
    totalQuestions: number;
    correctAnswers: number;
    score: number;
    date: Date | string;
};

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 });
        }
        const userId = (session.user as { id: string }).id;
        const sevenDaysPrior = new Date();
        sevenDaysPrior.setDate(sevenDaysPrior.getDate() - 7);

        // Care Plans
        const all_care_plans = await CarePlan.find({ user: userId }).select("createdAt updatedAt");
        const week_care_plans = all_care_plans.filter(i => {
            const date = new Date(i.updatedAt ?? i.createdAt);
            return date >= sevenDaysPrior;
        });
        const carePlans = { number_of_care_plans: all_care_plans.length, number_of_week_care_plans: week_care_plans.length }
        // console.log("care plan:", carePlans);

        // NCLEX Insights
        const all_questions_completed = await RecentSession.find({ user: userId }).select("category totalQuestions correctAnswers score date");
        const week_questions_completed = all_questions_completed.filter(i => {
            const date = new Date(i.date);
            return date >= sevenDaysPrior;
        })

        const total_completed_questions = all_questions_completed.reduce((sum, i) => sum + i.totalQuestions, 0);
        const week_completed_questions = week_questions_completed.reduce((sum, i) => sum + i.totalQuestions, 0);
        const overall_score = all_questions_completed.reduce((sum, i) => sum + i.score, 0) / all_questions_completed.length;

        const nclexInsights = { total_completed_questions, week_completed_questions, overall_score };

        // NCLEX Trend Score
        const getDayKey = (date: Date | string) =>
            new Date(date).toISOString().split("T")[0];

        const groupByDay = (sessions: CompletedSession[]) => {
            const grouped = sessions.reduce((acc, session) => {
                const day = getDayKey(session.date);

                if (!acc[day]) {
                    acc[day] = {
                        date: day,
                        totalQuestions: 0,
                        correctAnswers: 0,
                    };
                }

                acc[day].totalQuestions += session.totalQuestions;
                acc[day].correctAnswers += session.correctAnswers;

                return acc;
            }, {} as Record<
                string,
                { date: string; totalQuestions: number; correctAnswers: number }
            >);

            return Object.values(grouped).map(day => ({
                ...day,
                score: Math.round(
                    (day.correctAnswers / day.totalQuestions) * 100
                ),
            }));
        };

        const dailyNclexPerformance = groupByDay(all_questions_completed);
        // console.log("daily performance:", dailyNclexPerformance)


        // Strenth & Weakness
        const performanceByCategory = await RecentSession.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalCorrect: { $sum: "$correctAnswers" },
                    totalQuestions: { $sum: "$totalQuestions" }
                }
            },
            {
                $project: {
                    category: "$_id",
                    averageScore: {
                        $multiply: [
                            { $divide: ["$totalCorrect", "$totalQuestions"] },
                            100
                        ]
                    },
                    _id: 0,
                }
            },
            {
                $sort: {
                    averageScore: -1
                }
            }
        ])
        // console.log("Strenth Weakness:", performanceByCategory)

        const suggestions = generateAISuggestions(performanceByCategory);
        // console.log("suggestions:", suggestions);

        return NextResponse.json({
            success: true,
            dashboard: {
                carePlans,
                nclexInsights,
                nclexTrend: dailyNclexPerformance,
                performanceByCategory,
                suggestions
            }
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}