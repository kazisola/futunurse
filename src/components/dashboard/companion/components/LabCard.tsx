import type { LabCard } from "@/types/companion";
import React from "react";

const LabCard = ({ card }: { card: LabCard }) => {
    console.log("card:", card)
    return (
        <div>
            <h2>{card.name} | {card.type}</h2>
        </div>
    )
}

export default LabCard;