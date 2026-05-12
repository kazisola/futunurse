import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanionCard, CompanionType } from '@/types/companion';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface SubmitFormProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    type: CompanionType | null;
    setType: Dispatch<SetStateAction<CompanionType | null>>;
    setCard: Dispatch<SetStateAction<CompanionCard | null>>
}

const SubmitForm = ({ query, setQuery, type, setType, setCard }: SubmitFormProps) => {
    const type_tabs: { label: string, type: CompanionType }[] = [
        { label: "Drug", type: "drug" },
        { label: "Lab", type: "lab" },
        { label: "Diagnostic", type: "diagnostic" }
    ]
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/companion/search`, {
                params: {
                    query: query,
                    type: type
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(response.status === 200) {
                setQuery("")
                setType(null)
                setCard(response.data?.card)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='space-y-3'>
            <Input type='text' placeholder='search drug, lab, diagnostic'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
            />
            <ul className="flex justify-between gap-2">
                {type_tabs.map((item, index) => (
                    <li key={index} className="flex-1">
                        <Button
                            type='button'
                            variant={type === item.type ? 'default' : 'outline'}
                            className="w-full rounded-lg"
                            onClick={() => setType(item.type)}>
                            {item.label}
                        </Button>
                    </li>
                ))}
            </ul>
            <Button type="submit" className='w-full rounded-md'>Search <ArrowRight /></Button>
        </form>
    )
}

export default SubmitForm;