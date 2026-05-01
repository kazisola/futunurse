import { Document } from "mongoose";

export interface IPatient {
    // Patient Demographics
    name: string | null;
    age: number | null;
    gender: "male" | "female" | null;
    specialty: "medical surgical" | "pediatrics" | "OB/GYN" | "phsychiatric" | "critical care" | "community health" | null;
    mrn: string | null,
    primaryDiagnoses: string | null,
    secondaryDiagnoses: string | null,
    // Patient Vitals & Assesment
    vitals: {
        temperature: number | null,
        bloodPressure: string | null,
        heartRate: string | null,
        respiratoryRate: string | null,
        oxygenSaturation: string | null,
        painLevel: number | null
    },
    labResults: string | null,
    physicalFindings: string | null,
    currentMedications: string | null,
    allergies: string | null
}

export type Interventions = {
    action: string
    rationale: string
}
export type Goals = {
    shortTerm: string
    longTerm: string
}
export type Diagnosis = {
    nandaLabel: string
    statement: string
    definingCharacteristics: string[]
    relatedFactors: string[]
    priority: "High" | "Medium" | "Low"
    goals: Goals
    interventions: Interventions[]
    evaluationCriteria: string[]
    patientEducation: string
    references: string[]
}

export interface ICarePlan extends Document {
    patient: IPatient;
    diagnoses: Diagnosis[];
    bookmarked?: boolean;
    createdAt: Date;
    updatedAt: Date
}