import { Button } from '@/components/ui/button';
import { CompanionCard, CompanionType } from '@/types/companion';
import axios from 'axios';
import { FlaskConical, Pill, Stethoscope } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface SuggestionsProps {
    setCard: Dispatch<SetStateAction<CompanionCard | null>>;
    responseLoading: boolean;
    setResponseLoading: Dispatch<SetStateAction<boolean>>
}

const Suggestions = ({ setCard, responseLoading, setResponseLoading }: SuggestionsProps) => {
    const suggestions: { query: string; type: CompanionType }[] = [
        { query: "Metformin", type: "drug" as const },
        { query: "Warfarin", type: "drug" as const },
        { query: "Digoxin", type: "drug" as const },
        { query: "Potassium", type: "lab" as const },
        { query: "Troponin", type: "lab" as const },
        { query: "CBC", type: "lab" as const },
        { query: "Lumbar Puncture", type: "diagnostic" as const },
        { query: "MRI Brain", type: "diagnostic" as const },
    ]
    const handleClickSuggestion = async (query: string, type: CompanionType) => {
        try {
            setResponseLoading(true);
            const response = await axios.get(`http://localhost:3000/api/companion/search`, {
                params: {
                    query: query,
                    type: type
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                setCard(response.data?.card)
                setResponseLoading(false)
            }
        } catch (error) {
            setResponseLoading(false)
            console.error(error)
        }
    }
    return (
        <section>
            <h5 className='uppercase text-xs font-semibold mb-2 text-slate-800'>Try these</h5>
            <ul className='flex gap-1 flex-wrap'>
                {suggestions.map((suggestion, index) => <li key={index}>
                    <Button
                        onClick={() => handleClickSuggestion(suggestion.query, suggestion.type)}
                        className={`
                            text-xs rounded-full h-6 border-none shadow-none hover:bg-transparent
                            ${suggestion.type === "drug"
                                ? "bg-blue-100 text-blue-700"
                                : suggestion.type === "lab"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-violet-100 text-violet-700"
                            }
                            `} size={'sm'}>
                        {suggestion.type === 'drug' ?
                            <Pill />
                            :
                            suggestion.type === 'lab' ?
                                <FlaskConical />
                                :
                                suggestion.type === 'diagnostic' ?
                                    <Stethoscope />
                                    :
                                    null
                        }
                        {suggestion.query}
                    </Button>
                </li>)}
            </ul>
        </section>
    )
}

export default Suggestions;