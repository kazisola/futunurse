"use client";
import React, { useState } from "react";
import { Brain, TrendingUp, TrendingDown, Sparkles, Target, ChevronDown } from "lucide-react";

type AISuggestion = {
    title: string;
    score?: number;
    description: string;
    type: "weakness" | "strength" | "pattern";
}

interface SuggestionsProps {
    ai_suggestions: AISuggestion[]
}

const AISuggestions = ({ ai_suggestions }: SuggestionsProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggleSection = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };


    const getTypeStyles = (type: string) => {
        switch (type) {
            case "weakness":
                return {
                    gradient: "from-red-500/10 via-orange-500/10 to-yellow-500/10",
                    border: "border-red-200/50",
                    icon: TrendingDown,
                    iconColor: "text-red-500",
                    badge: "bg-red-100 text-red-700",
                    glow: "shadow-red-500/20"
                };
            case "strength":
                return {
                    gradient: "from-green-500/10 via-emerald-500/10 to-teal-500/10",
                    border: "border-green-200/50",
                    icon: TrendingUp,
                    iconColor: "text-green-500",
                    badge: "bg-green-100 text-green-700",
                    glow: "shadow-green-500/20"
                };
            case "pattern":
                return {
                    gradient: "from-purple-500/10 via-blue-500/10 to-indigo-500/10",
                    border: "border-purple-200/50",
                    icon: Brain,
                    iconColor: "text-purple-500",
                    badge: "bg-purple-100 text-purple-700",
                    glow: "shadow-purple-500/20"
                };
            default:
                return {
                    gradient: "from-gray-500/10 via-slate-500/10 to-gray-500/10",
                    border: "border-gray-200/50",
                    icon: Target,
                    iconColor: "text-gray-500",
                    badge: "bg-gray-100 text-gray-700",
                    glow: "shadow-gray-500/20"
                };
        }
    };

    return (
        <div className="border border-gray-200/30 hover:border-gray-200/50 rounded-lg p-4 bg-white duration-200">
            <h4 className='mb-1 flex items-center gap-2.5 text-sm font-semibold text-slate-900'><Sparkles size={18} className='text-blue-700' /> Personalized Suggestions</h4>
            <p className='text-sm text-gray-500 mb-5'>AI-powered suggestions to improve your performance</p>

            <div className="space-y-4">
                {
                    ai_suggestions.map((item, index) => {
                        const styles = getTypeStyles(item.type);
                        const Icon = styles.icon;
                        // const isOpen = openSections[index];
                        const isOpen = openIndex === index;
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={index}
                                className={`relative rounded-xl border-2 ${styles.border} bg-linear-to-br ${styles.gradient} backdrop-blur-sm transition-all duration-200 ${isHovered ? `shadow-lg ${styles.glow} scale-[1.02]` : 'shadow-md'}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <button
                                    onClick={() => toggleSection(index)}
                                    className="cursor-pointer w-full p-3 flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`p-2 rounded-xl bg-white/80 ${isHovered ? 'scale-110' : ''} transition-transform duration-300`}>
                                            <Icon className={`w-3.5 h-3.5 ${styles.iconColor}`} />
                                        </div>

                                        <div className="flex-1 text-left">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-sm font-medium text-gray-800 capitalize">
                                                    {
                                                        item.title.split(":").length > 1 ? item.title.split(":")[1] : item.title
                                                    }
                                                </h3>
                                            </div>

                                        </div>
                                    </div>

                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isHovered ? 'translate-x-1' : ''}`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-4 pb-4">
                                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/60">
                                            <p className="text-gray-700 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div >

            {
                ai_suggestions.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No suggestions available yet</p>
                    </div>
                )
            }
        </div >
    );
};

export default AISuggestions;