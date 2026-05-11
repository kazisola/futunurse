import mongoose, { Document, Schema, Types } from "mongoose";

interface ISearchEntry {
    query: string;
    type: "drug" | "lab" | "diagnostic";
    searchedAt: Date
}
interface ICompanionHistorySchema extends Document {
    user: Types.ObjectId;
    searches: ISearchEntry[]
}

const companion_history_schema = new Schema<ICompanionHistorySchema>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        index: true
    },
    searches: [
        {
            query: { type: String, required: true },
            type: { type: String, enum: ["drug", "lab", "diagnostic"], required: true },
            searchedAt: {type: Date, default: Date.now() }
        }
    ]
}, { timestamps: true })

export const CompanionHistory = mongoose.models.CompanionHistoryModel || mongoose.model("CompanionHistoryModel", companion_history_schema);