import React from "react";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, LucideIcon, Brain, CalendarClock, Stethoscope } from "lucide-react";

type Insight = {
    title: string;
    value: string | number;
    pass_probability?: string;
    this_week?: number;
    timeline?: string;
    color: "blue" | "purple" | "pink" | "green";
    icon: LucideIcon;
};

type QuickInsights = {
    quickInsights: {
        carePlans: {
            number_of_care_plans: number;
            number_of_week_care_plans: number;
        },
        nclexInsights: {
            total_completed_questions: number;
            week_completed_questions: number;
            overall_score: number;
        }
    }
};

const QuickInsights = ({ quickInsights }: QuickInsights) => {

    const { carePlans, nclexInsights } = quickInsights;
    console.log(nclexInsights)
    const insights: Insight[] = [
        {
            title: "Care Plans Created",
            value: carePlans.number_of_care_plans,
            this_week: carePlans.number_of_week_care_plans,
            color: "blue",
            icon: Stethoscope
        },
        {
            title: "Questions Completed",
            value: nclexInsights.total_completed_questions,
            this_week: nclexInsights.week_completed_questions,
            color: "purple",
            icon: CheckCircle,
        },
        {
            title: "Overall Score",
            value: (nclexInsights.overall_score || 0).toFixed(1),
            color: "pink",
            icon: Brain,
        },
        {
            title: "Avg. Response Time",
            value: "3.5s",
            timeline: "Last 30 days",
            color: "green",
            icon: CalendarClock,
        }
    ];

    const colorMap: Record<
        Insight["color"],
        { bg: string; accent: string }
    > = {
        blue: {
            bg: "bg-blue-600",
            accent: "bg-blue-500",
        },
        purple: {
            bg: "bg-purple-600",
            accent: "bg-purple-500",
        },
        pink: {
            bg: "bg-green-600",
            accent: "bg-green-500"
        },
        green: {
            bg: "bg-pink-600",
            accent: "bg-pink-500",
        },
    };

    const getPassProbability = (value: number) => {
        if (value <= 20) return "Critical";
        if (value <= 40) return "Low";
        if (value <= 60) return "Needs improvement";
        if (value <= 80) return "On track";
        return "Excellent";
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
            {insights.map((insight, index) => {
                const Icon = insight.icon;
                const colors = colorMap[insight.color];

                return (
                    <div
                        key={index}
                        className={`${colors.bg} text-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col`}
                    >

                        <div className="flex items-center gap-4">
                            <div
                                className={`${colors.accent} rounded-full p-3 flex items-center justify-center`}
                            >
                                <Icon className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-sm opacity-90">
                                    {insight.title}
                                </h2>
                                <h1 className="font-bold text-2xl">{insight.value}{insight.title == "Overall Score" && '%'}</h1>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm opacity-90 mt-auto max-sm:mt-8">
                            {insight.title == "Overall Score" && (
                                <div className="mt-5">
                                    <Progress
                                        value={Number(insight.value)}
                                        className="bg-white/30"
                                    />
                                    <div className="flex justify-between items-center mt-3">
                                        <p>NCLEX pass probability</p>
                                        <p className="font-medium">
                                            {getPassProbability(Number(insight.value))}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                {insight.title === "Questions Completed" && <p>This week</p>}
                                {insight.title === "Care Plans Created" && <p>This week</p>}
                                {insight.this_week && (

                                    <p className="font-medium">{insight.this_week}</p>
                                )}
                            </div>

                            {insight.timeline && (
                                <div className="flex justify-between items-center">
                                    <p>{insight.timeline}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default QuickInsights;
