import type { DrugCard } from "@/types/companion";
import React from "react";

const DrugCard = ({ card }: { card: DrugCard }) => {
    console.log("card:", card)
    return (
        <div>
            <h2>{card.name} | {card.type}</h2>
        </div>
    )
}

export default DrugCard;