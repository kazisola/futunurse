import { CompanionType } from "@/types/companion";
import axios from "axios";
import { FlaskConical, Pill, Stethoscope } from 'lucide-react';
import React, { useEffect, useState } from "react";

const SavedCards = () => {
    const [cards, setCards] = useState<{ query: string, type: CompanionType }[]>([]);
    useEffect(() => {
        const handleGetCards = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/companion/bookmarks`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if(response.status == 200) {
                    setCards(response.data?.saved_cards)
                }
            } catch (error) {
                console.error(error)
            }
        }
        handleGetCards();
    }, []);
    return (
        <section>
            <h5 className='uppercase text-xs font-semibold mb-2 text-slate-800'>Saved cards</h5>
            {cards.length > 0 ?
                <ul className="flex flex-col gap-1">
                    {cards.map((card, index) => <li key={index} className="flex justify-between items-center hover:bg-gray-200 py-1 px-1 rounded-md cursor-pointer">
                        <p className="text-sm capitalize">{card.query}</p>
                        {card.type === 'drug' ?
                            <Pill className="w-4 h-4 text-slate-800" />
                            :
                            card.type === 'lab' ?
                                <FlaskConical className="w-4 h-4 text-slate-800" />
                                :
                                card.type === 'diagnostic' ?
                                    <Stethoscope className="w-4 h-4 text-slate-800" />
                                    :
                                    null
                        }
                    </li>)}
                </ul>
                :
                <div className="text-center">No Saved Cards</div>
            }
        </section>
    )
}

export default SavedCards;