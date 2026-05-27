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

const getTypeConfig = (type: string) => {
    switch (type) {
        case "weakness": return {
            icon: TrendingDown,
            iconColor: "text-rose-400",
            dotColor: "bg-rose-400",
            label: "Weakness",
            labelColor: "text-rose-400",
        };
        case "strength": return {
            icon: TrendingUp,
            iconColor: "text-emerald-500",
            dotColor: "bg-emerald-500",
            label: "Strength",
            labelColor: "text-emerald-500",
        };
        case "pattern": return {
            icon: Brain,
            iconColor: "text-violet-500",
            dotColor: "bg-violet-500",
            label: "Pattern",
            labelColor: "text-violet-500",
        };
        default: return {
            icon: Target,
            iconColor: "text-gray-400",
            dotColor: "bg-gray-400",
            label: "Insight",
            labelColor: "text-gray-400",
        };
    }
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-full p-3">
            <Brain size={24} className="text-blue-400" />
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">No suggestions yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Complete more practice sessions to unlock personalized insights
            </p>
        </div>
        <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-full bg-blue-100"
                    style={{ width: `${[24, 16, 32, 20, 28][i]}px` }} />
            ))}
        </div>
    </div>
);

const AISuggestions = ({ ai_suggestions }: SuggestionsProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="border border-gray-200/30 hover:border-gray-200/50 rounded-2xl p-5 bg-white duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-800">
                        <Sparkles size={18} className="text-blue-600" />
                        Personalized Suggestions
                    </h4>
                    <p className="text-sm text-gray-400 mt-0.5">AI-powered insights to improve your performance</p>
                </div>
            </div>

            {ai_suggestions.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-2">
                    {ai_suggestions.map((item, index) => {
                        const config = getTypeConfig(item.type);
                        const Icon = config.icon;
                        const isOpen = openIndex === index;
                        const title = item.title.includes(":") ? item.title.split(":")[1].trim() : item.title;

                        return (
                            <div
                                key={index}
                                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                                    isOpen ? 'border-gray-200' : 'border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                                    className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className={`shrink-0 p-1.5 rounded-lg bg-gray-50`}>
                                            <Icon size={15} className={config.iconColor} />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 truncate capitalize">
                                            {title}
                                        </span>
                                        {/* <span className={`shrink-0 text-xs font-semibold ${config.labelColor} flex items-center gap-1`}>
                                            <span className={`w-1.5 h-1.5 rounded-full inline-block ${config.dotColor}`} />
                                            {config.label}
                                        </span> */}
                                    </div>
                                    <ChevronDown
                                        size={16}
                                        className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                <div className={`transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                                    <div className="px-4 pb-4 pt-0">
                                        <div className="border-t border-gray-100 pt-3">
                                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Legend */}
            {ai_suggestions.length > 0 && (
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                    {[
                        { dot: "bg-emerald-500", label: "Strength" },
                        { dot: "bg-rose-400", label: "Weakness" },
                        { dot: "bg-violet-500", label: "Pattern" },
                    ].map(({ dot, label }) => (
                        <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
                            <span className={`w-2 h-2 rounded-full inline-block ${dot}`} />
                            {label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AISuggestions;