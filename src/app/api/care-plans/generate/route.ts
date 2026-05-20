import { configDotenv } from "dotenv";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import { authOptions } from "../../auth/[...nextauth]/route";
import { extractJson } from "@/lib/extractJson";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

interface IVitals {
    temperature: number,
    bloodPressure: string,
    heartRate: string,
    respiratoryRate: string,
    oxygenSaturation: string,
    painLevel: number
}

interface IPatientData {
    name: string;
    age: number;
    gender: "male" | "female";
    specialty: "medical surgical" | "pediatrics" | "OB/GYN" | "phsychiatric" | "critical care" | "community health" | null;
    mrn?: string | null,
    primaryDiagnoses: string | null,
    secondaryDiagnoses?: string | null,
    vitals?: IVitals,
    labResults?: string | null,
    physicalFindings: string | null,
    currentMedications: string | null,
    allergies?: string
}

const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json"
    }
});

const generateWithRetry = async (
    prompt: string,
    retries = 3
): Promise<GenerateContentResult> => {

    for (let attempt = 0; attempt < retries; attempt++) {

        try {
            return await model.generateContent(prompt);

        } catch (error: unknown) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unknown error";

            // Unavailable or high demand only
            // const is503 =
            //     message.includes("503") ||
            //     message.includes("high demand") ||
            //     message.includes("Service Unavailable");

            // if (!is503) {
            //     throw error;
            // }
            // Includes exceeding quota error too
            const isAIError =
                message.includes("503") ||
                message.includes("429") ||
                message.includes("high demand") ||
                message.includes("Service Unavailable") ||
                message.includes("Too Many Requests") ||
                message.includes("quota");

            if (!isAIError) {
                throw error;
            }

            if (attempt === retries - 1) {
                throw new Error(
                    "Care Plan AI service is currently busy or unavailable. Try again later"
                );
            }

            // Exponential backoff
            await new Promise(resolve =>
                setTimeout(resolve, 1000 * (attempt + 1))
            );
        }
    }

    throw new Error("Failed to generate content.");
};

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 })
        }

        const patient: IPatientData = await req.json();
        // console.log("patient:", patient);

        const CARE_PLAN_SYSTEM_PROMPT: string = `
        You are an experienced nursing instructor. Generate a detailed nursing care plan in JSON format based on the following patient case. The care plan must strictly follow NANDA-I diagnoses, NIC (Nursing Interventions Classification), and NOC (Nursing Outcomes Classification). Always use official NANDA wording for diagnoses.

        ### Patient data input in JSON:
        {
        "name": ${patient.name},
        "age": ${patient.age},
        "gender": ${patient.gender},
        "specialty": ${patient.specialty},
        "mrn": ${patient.mrn || "None"},
        "primaryDiagnoses": ${patient.primaryDiagnoses},
        "secondaryDiagnoses": ${patient.secondaryDiagnoses || "None"},
        "vitals": {
            "temperature": ${patient.vitals?.temperature},
            "bloodPressure": ${patient.vitals?.bloodPressure},
            "heartRate": ${patient.vitals?.heartRate},
            "respiratoryRate": ${patient.vitals?.respiratoryRate},
            "oxygenSaturation": ${patient.vitals?.oxygenSaturation},
            "painLevel": ${patient.vitals?.painLevel}
        },
        "labResults": ${patient.labResults || "None"},
        "physicalFindings": ${patient.physicalFindings},
        "currentMedications": ${patient.currentMedications},
        "allergies": ${patient.allergies || "None"}
        }

        ### Special instructions:
        - Use the available data (ignore missing or empty string fields).  
        - If lab results are missing, explicitly mention them as pending and explain why they matter.  
        - Ensure the diagnosis matches the condition (e.g., CHF → excess fluid volume risk/actual, not deficient fluid).  
        - For **Risk for…** diagnoses: do NOT include “as evidenced by,” since they have no defining characteristics.  
        - Interventions must be **specific, evidence-based, and context-appropriate** (e.g., mention fluid restriction for CHF if relevant).  
        - Rationales must be clear, accurate, and concise.  
        - Goals must be **SMART** and realistic in relation to medical treatment.  

        ### Instructions for output:
        1. Provide **at least 3 NANDA nursing diagnoses**, each in correct format:
        - Problem (NANDA diagnosis label)  
        - Related to (etiology)  
        - As evidenced by (for actual diagnoses only)  

        2. For each diagnosis include:
        - **priority**: High / Medium / Low.  
        - **goals**: Short-term and long-term, in **SMART format**.  
        - **interventions**: At least **3–4 NIC interventions**, each with an action and rationale tied to the patient’s case.  
        - **evaluationCriteria**: Measurable criteria linked directly to goals.  
        - **patientEducation**: Key teaching for patient/family (specific to their condition).  
        - **references**: At least one academic/clinical source (e.g., Ackley & Ladwig, Nursing Diagnosis Handbook, 12th ed.).

        3. Format the output strictly as JSON in the following structure:

        {
        "diagnoses": [
            {
            "nandaLabel": "<official NANDA diagnosis>",
            "statement": "<Diagnosis in full NANDA format: Problem + Related to + As evidenced by (if actual)>",
            "definingCharacteristics": ["<symptom1>", "<symptom2>"],
            "relatedFactors": ["<etiology factor1>", "<etiology factor2>"],
            "priority": "<High | Medium | Low>",
            "goals": {
                "shortTerm": "<SMART short-term goal>",
                "longTerm": "<SMART long-term goal>"
            },
            "interventions": [
                {
                "action": "<NIC intervention: what the nurse will do>",
                "rationale": "<Evidence-based explanation of why this intervention is done>"
                }
            ],
            "evaluationCriteria": "<How success is measured, tied directly to goals, in a array of string format>",
            "patientEducation": "<Specific teaching for patient/family>",
            "references": ["<academic or clinical reference>"]
            }
        ]
        }

        ### Output:
        Produce only the JSON. The care plan must be detailed, comprehensive, and realistic for a nursing student’s graded assignment. Avoid pathophysiology mismatches and follow NANDA conventions strictly.
        `

        const result = await generateWithRetry(
            CARE_PLAN_SYSTEM_PROMPT
        );

        const raw_content = result.response.text();

        let care_plan;

        try {

            care_plan = extractJson(raw_content);

        } catch (parseError) {

            console.error(
                "Failed to parse AI JSON:",
                parseError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "AI returned invalid response format."
                },
                { status: 422 }
            );
        }

        return NextResponse.json({
            success: true,
            care_plan
        });

    } catch (error: unknown) {

        console.error("Care Plan API Error:", error);

        const message =
            error instanceof Error
                ? error.message
                : "Internal Server Error";

        const status =
            message.includes(
                "AI service is currently busy"
            )
                ? 503
                : 500;

        return NextResponse.json(
            {
                success: false,
                message
            },
            { status }
        );
    }
}