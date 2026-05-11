import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanionType } from '@/types/companion';
import { ArrowRight } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';

interface SubmitFormProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    type: string | null;
    setType: Dispatch<SetStateAction<CompanionType | null>>
}

const SubmitForm = ({ query, setQuery, type, setType }: SubmitFormProps) => {
    const type_tabs: { label: string, type: CompanionType }[] = [
        { label: "Drug", type: "drug" },
        { label: "Lab", type: "lab" },
        { label: "Diagnostic", type: "diagnostic" }
    ]
    return (
        <form className='space-y-3'>
            <Input type='text' placeholder='search drug, lab, diagnostic'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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