import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { CarePlan } from "@/models/PatientCarePlan/PatientCarePlanModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User not authenticated!" }, { status: 401 });
        }

        const userId = (session.user as { id: string }).id;
        const { id } = await params;

        const update = await CarePlan.findOneAndUpdate(
            { _id: id, user: userId },
            [{ $set: { bookmarked: { $not: "$bookmarked" } } }],
            { new: true }
        )
        if(!update) {
            return NextResponse.json({
                success: false,
                message: "Care plan not found!"
            }, { status: 404 })
        }
        return NextResponse.json({
            success: true,
            message: "Updated bookmark status!",
            update
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return handleApiError(error);
    }
}