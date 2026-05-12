import type { DrugCard } from "@/types/companion";
import { Pill } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";

const DrugCard = ({ card }: { card: DrugCard }) => {
    console.log("card:", card)
    return (
        <div>
            <header className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <Pill className="w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize mb-0">{card.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-3 bg-blue-100 text-blue-600 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.brandNames.join(" • ")}</p>
                        </div>
                    </div>
                </div>
                <BookmarkAction card={card} />
            </header>
        </div>
    )
}

export default DrugCard;