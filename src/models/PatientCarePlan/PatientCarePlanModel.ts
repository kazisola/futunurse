import { Diagnosis, IPatient } from "@/types/PatientCarePlan";
import mongoose, { Document, Types } from "mongoose";
import IUser from "../User/UserModel";

export interface ICarePlan extends Document {
    user: Types.ObjectId | typeof IUser;
    patient: IPatient;
    diagnoses: Diagnosis[];
    bookmarked?: boolean;
}

const PatientCarePlanSchema = new mongoose.Schema<ICarePlan>({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    patient: {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female"]
        },
        specialty: {
            type: String,
            enum: ["medical surgical", "pediatrics", "OB/GYN", "phsychiatric", "critical care", "community health"]
        },
        mrn: {
            type: String,
            default: null
        },
        primaryDiagnoses: {
            type: String,
            required: true
        },
        secondaryDiagnoses: {
            type: String
        },
        vitals: {
            temperature: {
                type: Number
            },
            bloodPressure: {
                type: String
            },
            heartRate: {
                type: String
            },
            respiratoryRate: {
                type: String
            },
            oxygenSaturation: {
                type: String
            },
            painLevel: {
                type: Number
            }
        },
        labResults: {
            type: String,
            required: false
        },
        physicalFindings: {
            type: String,
            required: false
        },
        currentMedications: {
            type: String,
            required: false
        },
        allergies: {
            type: String,
            required: false
        }
    },
    diagnoses: [
        {
            nandaLabel: {
                type: String,
                required: true,
            },
            statement: {
                type: String,
                required: true
            },
            definingCharacteristics: {
                type: [String],
                default: []
            },
            relatedFactors: {
                type: [String],
                default: []
            },
            priority: {
                type: String,
                required: true,
                enum: ["High", "Medium", "Low"]
            },
            goals: {
                shortTerm: { type: String, required: true },
                longTerm: { type: String, required: true }
            },
            interventions: [
                {
                    action: {
                        type: String,
                        required: true
                    },
                    rationale: {
                        type: String,
                        required: true
                    }
                }
            ],
            evaluationCriteria: {
                type: [String],
                default: []
            },
            patientEducation: {
                type: String,
                required: true
            },
            references: {
                type: [String],
                default: []
            }
        }
    ],
    bookmarked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const CarePlan = mongoose.models.CarePlan || mongoose.model<ICarePlan>("CarePlan", PatientCarePlanSchema);