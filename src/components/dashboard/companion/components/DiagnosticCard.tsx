import type { DiagnosticCard } from "@/types/companion";
import { Stethoscope } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";

const DiagnosticCard = ({ card }: { card: DiagnosticCard }) => {
    console.log("card:", card)
    return (
        <div>
            <header className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                    <div className="bg-violet-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <Stethoscope className="w-6 text-violet-700" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize">{card.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-3 bg-violet-100 text-violet-700 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.category}</p>
                        </div>
                    </div>
                </div>
                <BookmarkAction card={card} />
            </header>
        </div>
    )
}

export default DiagnosticCard;