import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLazyGenerateAiResponseQuery } from '@/redux/services/companionApi';
import { CompanionCard, CompanionType } from '@/types/companion';
import { ArrowRight, Search } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

interface SubmitFormProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    type: CompanionType | null;
    setType: Dispatch<SetStateAction<CompanionType | null>>;
    setCard: Dispatch<SetStateAction<CompanionCard | null>>;
    responseLoading: boolean;
    setResponseLoading: Dispatch<SetStateAction<boolean>>
}

const SubmitForm = ({ query, setQuery, type, setType, setCard, responseLoading, setResponseLoading }: SubmitFormProps) => {
    const type_tabs: { label: string, type: CompanionType }[] = [
        { label: "Drug", type: "drug" },
        { label: "Lab", type: "lab" },
        { label: "Diagnostic", type: "diagnostic" }
    ]

    const [generateAiResponse] = useLazyGenerateAiResponseQuery();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setResponseLoading(true);
            const response = await generateAiResponse({ query, type }).unwrap();
            console.log("response:", response)
            setQuery("")
            setType(null)
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
        <form onSubmit={handleSubmit} className='space-y-3'>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search drug, lab, diagnostic..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    className="h-12 pl-10 text-sm shadow-xs focus-visible:ring-2"
                />
            </div>
            <ul className="flex justify-between gap-2 bg-gray-50 p-2 rounded-md">
                {type_tabs.map((item, index) => (
                    <li key={index} className="flex-1">
                        <Button
                            type='button'
                            size={'sm'}
                            className={`w-full rounded-md text-[13px] font-medium bg-gray-100 hover:bg-gray-200 text-black border ${type === item.type ? 'bg-gray-900 hover:bg-gray-900 border-none text-white' : ''}`}
                            onClick={() => setType(item.type)}>
                            {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
            <Button type="submit" size={'lg'} className='w-full rounded-md' disabled={responseLoading || !type}>
                {responseLoading ?
                    ('Thinking...')
                    :
                    (<>Search <ArrowRight /></>)
                }
            </Button>
        </form>
    )
}

export default SubmitForm;