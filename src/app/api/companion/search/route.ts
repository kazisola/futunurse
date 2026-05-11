import { CompanionType } from "@/types/companion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const query = searchParams.get("query")?.trim()
    const type = searchParams.get("type") as CompanionType

    if(!query || query.length < 2) {
        return NextResponse.json({
            success: false,
            message: "Query must be more than 2 characters!"
        }, { status: 400 })
    }
    if(!["drug", "lab", "diagnostic"].includes(type)) {
        return NextResponse.json({
            success: false,
            message: "Companion type must be one of 'drug', 'lab', or 'diagnostic'"
        }, { status: 400 })
    }
    
    return NextResponse.json({ success: true, message: "Yet to be done" })
}