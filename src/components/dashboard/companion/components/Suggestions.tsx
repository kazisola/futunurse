import { Button } from '@/components/ui/button';
import { CompanionType } from '@/types/companion';
import { FlaskConical, Pill, Stethoscope } from 'lucide-react';
import React from 'react';

const Suggestions = () => {
    const suggestions: { label: string; type: CompanionType }[] = [
        { label: "Metformin", type: "drug" as const },
        { label: "Warfarin", type: "drug" as const },
        { label: "Digoxin", type: "drug" as const },
        { label: "Potassium", type: "lab" as const },
        { label: "Troponin", type: "lab" as const },
        { label: "CBC", type: "lab" as const },
        { label: "Lumbar Puncture", type: "diagnostic" as const },
        { label: "MRI Brain", type: "diagnostic" as const },
    ]
    return (
        <section>
            <h5 className='uppercase text-xs font-semibold mb-2 text-slate-800'>Try these</h5>
            <ul className='flex gap-1 flex-wrap'>
                {suggestions.map((suggestion, index) => <li key={index}>
                    <Button className={`
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
                        {suggestion.label}
                    </Button>
                </li>)}
            </ul>
        </section>
    )
}

export default Suggestions;