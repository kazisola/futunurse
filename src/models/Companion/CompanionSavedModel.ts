import mongoose, { Document, Schema, Types } from "mongoose";
import { CompanionCard } from "@/types/companion";

interface ICompanionSavedSchema extends Document {
    user: Types.ObjectId;
    query: string;
    type: "drug" | "lab" | "diagnostic";
    card: CompanionCard;
    searchedAt: Date
}

const companion_saved_schema = new Schema<ICompanionSavedSchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    query: { type: String, required: true },
    type: { type: String, enum: ["drug", "lab", "diagnostic"], required: true },
    card: { type: Schema.Types.Mixed, required: true },
    searchedAt: { type: Date, default: Date.now() }
}, { timestamps: true })

export const CompanionSaved = mongoose.models.CompanionSaved || mongoose.model("CompanionSaved", companion_saved_schema);