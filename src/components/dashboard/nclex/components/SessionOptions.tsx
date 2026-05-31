import { Button } from '@/components/ui/button';
import { BookOpen, Brain, Play } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const options = [
    {
        icon: Brain,
        title: "Adaptive Practice",
        label: "Personalized to your weak areas",
        description: "AI-powered questions that adapt to your performance in real time, focusing on the areas that need the most improvement.",
        cta: "Start Adaptive Session",
        ctaIcon: Play,
        accent: {
            icon: "text-violet-600",
            iconBg: "bg-violet-50",
            badge: "bg-violet-50 text-violet-500 border-violet-100",
            button: "",
            glow: "bg-violet-50",
            tag: "AI-Powered",
        },
    },
    {
        icon: BookOpen,
        title: "Category Focus",
        label: "Target a specific content area",
        description: "Choose a specific NCLEX domain to drill deep on particular content areas and systematically raise your pass probability.",
        cta: "Choose Category",
        ctaIcon: BookOpen,
        accent: {
            icon: "text-blue-600",
            iconBg: "bg-blue-50",
            badge: "bg-blue-50 text-blue-500 border-blue-100",
            button: "bg-blue-600 hover:bg-blue-700",
            glow: "bg-blue-50",
            tag: "Targeted",
        },
    },
];

const SessionOptions = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (index: number) => {
        if (index === 1) router.push(`${pathname}/categories`);
    };

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {options.map((option, index) => {
                const Icon = option.icon;
                const CtaIcon = option.ctaIcon;
                const a = option.accent;

                const inner = (
                    <div className="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 flex flex-col gap-4 h-full transition-colors duration-200 group">

                        <div className="flex items-start justify-between">
                            <div className={`${a.iconBg} rounded-xl p-2.5 inline-flex`}>
                                <Icon size={18} className={a.icon} />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${a.badge}`}>
                                {a.tag}
                            </span>
                        </div>


                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-0.5">{option.title}</h4>
                            <p className="text-xs font-medium text-gray-400 mb-2">{option.label}</p>
                            <p className="text-sm text-gray-500 leading-relaxed">{option.description}</p>
                        </div>


                        <Button
                            size="lg"
                            className={`w-full  gap-2 font-semibold ${a.button}`}
                        >
                            <CtaIcon size={15} />
                            {option.cta}
                        </Button>
                    </div>
                );

                return index === 0 ? (
                    <Link
                        key={index}
                        href={{ pathname: `${pathname}/new-session`, query: { category: 'mixed personalized' } }}
                        className="h-full"
                    >
                        {inner}
                    </Link>
                ) : (
                    <div key={index} className="h-full" onClick={() => handleClick(index)}>
                        {inner}
                    </div>
                );
            })}
        </div>
    );
};

export default SessionOptions;