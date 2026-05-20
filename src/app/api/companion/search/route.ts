import { connectDB } from "@/lib/mongoose";
import { CompanionCard, CompanionType } from "@/types/companion";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { DIAGNOSTIC_SYSTEM_PROMPT, DRUG_SYSTEM_PROMPT, LAB_SYSTEM_PROMPT } from "@/lib/companion/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";
import { extractJson } from "@/lib/extractJson";
import { handleApiError } from "@/lib/apiError";
import { CompanionSaved } from "@/models/Companion/CompanionSavedModel";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const query = searchParams.get("query")?.toLowerCase().trim()
        const type = searchParams.get("type")?.toLowerCase() as CompanionType

        if (!query || query.length < 2) {
            return NextResponse.json({
                success: false,
                message: "Query must be more than 2 characters!"
            }, { status: 400 })
        }
        if (!["drug", "lab", "diagnostic"].includes(type)) {
            return NextResponse.json({
                success: false,
                message: "Companion type must be one of 'drug', 'lab', or 'diagnostic'"
            }, { status: 400 })
        }

        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 });
        }

        // Return generated card if already saved
        const existing = await CompanionSaved.findOne({
            user: (session.user as { id: string }).id,
            query,
            type
        })
            .select("card -_id")
            .lean<{ card: CompanionCard }>();
            
        if (existing) {
            return NextResponse.json({ success: true, card: existing.card })
        }

        console.log("------------------------------MOVING ON TO AI GENERATION------------------------------")

        const system_prompt_map = {
            drug: DRUG_SYSTEM_PROMPT,
            lab: LAB_SYSTEM_PROMPT,
            diagnostic: DIAGNOSTIC_SYSTEM_PROMPT
        }
        const system_prompt = system_prompt_map[type]

        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            generationConfig: {
                temperature: 0.4,
                responseMimeType: "application/json"
            }
        })

        const prompt = `
        ${system_prompt}

        User query:
        ${query}
        `

        const result = await model.generateContent(prompt);
        const raw_content = result.response.text();

        const card = extractJson(raw_content)
        console.log("card from ai:", card)
        return NextResponse.json({ success: true, card })
    } catch (error) {
        console.log(error);
        return handleApiError(error)
    }
}