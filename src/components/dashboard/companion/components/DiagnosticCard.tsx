import type { DiagnosticCard } from "@/types/companion";
import React from "react";

const DiagnosticCard = ({ card }: { card: DiagnosticCard }) => {
    console.log("card:", card)
    return (
        <div>
            <h2>{card.name} | {card.type}</h2>
        </div>
    )
}

export default DiagnosticCard;