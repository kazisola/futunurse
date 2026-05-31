import { Button } from '@/components/ui/button';
import { useLazyGenerateAiResponseQuery } from '@/redux/services/companionApi';
import { CompanionCard, CompanionType } from '@/types/companion';
import { FlaskConical, Pill, Stethoscope } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

interface SuggestionsProps {
    setQuery: Dispatch<SetStateAction<string>>;
    setCard: Dispatch<SetStateAction<CompanionCard | null>>;
    responseLoading: boolean;
    setResponseLoading: Dispatch<SetStateAction<boolean>>
}

const Suggestions = ({ setQuery, setCard, responseLoading, setResponseLoading }: SuggestionsProps) => {
    const [generateAiResponse] = useLazyGenerateAiResponseQuery();
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
            setQuery(query);
            setResponseLoading(true);
            const response = await generateAiResponse({ query, type }).unwrap();
            console.log("response:", response)
            setQuery("")
            setCard(response.card)

        } catch (error: unknown) {
            console.error(error);

            const getErrorMessage = (value: unknown): string => {

                // RTK Query / Axios-style error
                if (
                    typeof value === 'object' &&
                    value !== null &&
                    'data' in value
                ) {
                    const data = (value as { data?: unknown }).data;

                    if (
                        typeof data === 'object' &&
                        data !== null &&
                        'message' in data &&
                        typeof (data as { message?: unknown }).message === 'string'
                    ) {
                        return (data as { message: string }).message;
                    }
                }

                // Native Error
                if (
                    value instanceof Error &&
                    typeof value.message === 'string'
                ) {
                    return value.message;
                }

                return 'Something went wrong. Please try again.';
            };

            toast.error(getErrorMessage(error));
        } finally {
            setResponseLoading(false)
        }
    }
    return (
        <section>
            <h5 className='uppercase text-xs font-semibold mb-2 text-slate-800'>Try these</h5>
            <ul className='flex gap-1 flex-wrap'>
                {suggestions.map((suggestion, index) => <li key={index}>
                    <Button
                        size={'sm'}
                        onClick={() => handleClickSuggestion(suggestion.query, suggestion.type)}
                        className={`
                            h-6 w-max text-xs border-none shadow-none hover:bg-transparent
                            ${suggestion.type === "drug"
                                ? "bg-blue-100 text-blue-700"
                                : suggestion.type === "lab"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-violet-100 text-violet-700"
                            }
                            `}>
                        {suggestion.type === 'drug' ?
                            <Pill className='!w-3.5' />
                            :
                            suggestion.type === 'lab' ?
                                <FlaskConical className='!w-3.5' />
                                :
                                suggestion.type === 'diagnostic' ?
                                    <Stethoscope className='!w-3.5' />
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