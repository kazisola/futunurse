import { Button } from "@/components/ui/button";
import { useGetSavedCardsQuery, useLazyGetSavedCardQuery } from "@/redux/services/companionApi";
import { CompanionCard } from "@/types/companion";
import { FlaskConical, FolderSearch, MoreVertical, Pill, Stethoscope } from 'lucide-react';
import React, { Dispatch, SetStateAction } from "react";

const SavedCards = ({ setCard }: { setCard: Dispatch<SetStateAction<CompanionCard | null>> }) => {
    const { data: { saved_cards } = {}, isLoading: cardsLoading } = useGetSavedCardsQuery();

    const [getSavedCard, { data: savedCard, isLoading }] = useLazyGetSavedCardQuery();

    if (cardsLoading || !saved_cards) return <div>Loading...</div>

    const handleGetSavedCard = async (cardId: string) => {
        try {
            const response = await getSavedCard({ id: cardId }).unwrap();
            setCard(response?.card?.card)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <section>
            <h5 className='uppercase text-xs font-semibold mb-2 text-slate-800'>Saved cards</h5>
            {saved_cards.length > 0 ?
                <ul className="flex flex-col gap-1 h-57.5 overflow-y-auto">
                    {saved_cards.map((card, index) => <li key={index} onClick={() => handleGetSavedCard(card._id)} className="flex justify-between items-center hover:bg-gray-100 py-1.5 px-2 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-2">
                            {/* <h5 className={`w-1.5 h-1.5 rounded-full ${card.type === 'drug' ? 'bg-blue-700' : card.type === 'lab' ? 'bg-rose-700' : 'bg-violet-700'}`}></h5> */}
                            <div>
                                {card.type === 'drug' ?
                                    <Pill className="w-3.5 h-3.5 text-blue-700" />
                                    :
                                    card.type === 'lab' ?
                                        <FlaskConical className="w-3.5 h-3.5 text-rose-700" />
                                        :
                                        card.type === 'diagnostic' ?
                                            <Stethoscope className="w-3.5 h-3.5 text-violet-700" />
                                            :
                                            null
                                }
                            </div>
                            <p className="text-sm capitalize">{card.query.length > 25 ? `${card.query.slice(0, 25)}...` : card.query}</p>
                        </div>
                        <div>
                            <Button size={'sm'} className="bg-transparent hover:bg-gray-200/60 text-gray-800 w-7 h-7 rounded-md"><MoreVertical /></Button>
                            {/* <Button size={'sm'} className="bg-transparent hover:bg-gray-200/60 text-red-400/80 hover:text-red-400"><Trash className="w-3.5 h-3.5" /></Button> */}
                        </div>
                    </li>)}
                </ul>
                :
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                        <FolderSearch className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-700 mb-1.5">No saved card</h3>
                    <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-8">
                        You do not have any drug, lab, or diagnostic card saved
                    </p>
                </div>
            }
        </section>
    )
}

export default SavedCards;