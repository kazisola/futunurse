import type { LabCard } from "@/types/companion";
import { FlaskConical } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";

const LabCard = ({ card }: { card: LabCard }) => {
    console.log("card:", card)
    return (
        <div>
            <header className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                    <div className="bg-rose-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <FlaskConical className="w-6 text-rose-700" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize mb-0">{card.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-3 bg-rose-100 text-rose-700 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.abbreviation}</p>
                        </div>
                    </div>
                </div>
                <BookmarkAction card={card} />
            </header>
        </div>
    )
}

export default LabCard;