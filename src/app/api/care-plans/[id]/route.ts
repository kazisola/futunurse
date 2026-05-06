import { handleApiError } from "@/lib/apiError";
import { connectDB } from "@/lib/mongoose";
import { CarePlan } from "@/models/PatientCarePlan/PatientCarePlanModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET CARE PLAN
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User not authenticated!" }, { status: 401 });
        }
        const { id } = await params;
        const carePlan = await CarePlan.findOne({ user: (session.user as { id: string }).id, _id:  id});
        // console.log("Care plan:", carePlan);
        return NextResponse.json({ success: true, carePlan }, { status: 200 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

// BOOKMARK CARE PLAN
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

// DELETE CARE PLAN
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log("id:", id);
        await CarePlan.findOneAndDelete({ _id: id });
        return NextResponse.json({ success: true, message: "Care plan deleted successfully!" });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}