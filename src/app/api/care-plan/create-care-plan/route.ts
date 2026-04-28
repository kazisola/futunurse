import { handleApiError } from "@/lib/apiError";
import { configDotenv } from "dotenv";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { GoogleGenerativeAI } from "@google/generative-ai";
configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

function extractJson(content: string): object {
    try {
        // First, try direct parse
        return JSON.parse(content);
    } catch {
        // If direct parse fails, try to extract {...} with regex
        const match = content.match(/\{[\s\S]*\}/);
        if (match) {
            try {
                return JSON.parse(match[0]); // parse the first valid JSON block
            } catch (err) {
                console.error("Extracted JSON still invalid:", err);
            }
        }
        throw new Error("No valid JSON found in AI response");
    }
}


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

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "User unauthenticated!" }, { status: 401 })
        }

        const patient: IPatientData = await req.json();
        // console.log("patient:", patient);

        const PROMPT: string = `
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
        - **priority**: High / Medium / Low (with reasoning in rationale).  
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

        console.log("PROMPT:", PROMPT)
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest",
            generationConfig: {
                temperature: 0.4,
                responseMimeType: "application/json",
            },
        })
        const result = await model.generateContent(PROMPT)
        const raw_content = result.response.text();
        // console.log("Raw Content:", raw_content)

        // Extract JSON
        let care_plan;
        try {
            care_plan = extractJson(raw_content);
        } catch (err) {
            console.error("Failed to parse care plan JSON:", err);
            return NextResponse.json({ success: false, error: "Invalid JSON from AI" }, { status: 422 });
        }
        // console.log("Care Plan Object:", care_plan);
        return NextResponse.json({ success: true, care_plan })
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}