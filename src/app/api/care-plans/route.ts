import { handleApiError } from "@/lib/apiError";
import { configDotenv } from "dotenv";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { CarePlan } from "@/models/PatientCarePlan/PatientCarePlanModel";
import { authOptions } from "../auth/[...nextauth]/route";
configDotenv();

// GET CARE PLANS
export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if(!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 })
        }
        const carePlans = await CarePlan.find({ user: (session.user as { id: string }).id }).select("-user -__v");
        return NextResponse.json({ success: true, carePlans }, { status: 200 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}

// SAVE AI-GENERATED CARE PLAN
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User not authenticated!" }, { status: 401 })
        }
        const { body } = await req.json();
        console.log("body:", body)
        const newCarePlan = await CarePlan.create({
            user: (session.user as { id: string }).id,
            patient: body.patientData,
            diagnoses: body.diagnoses
        });
        console.log("New care plan:", newCarePlan)
        return NextResponse.json({ success: true, message: "New care plan added", newCarePlan }, { status: 201 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}