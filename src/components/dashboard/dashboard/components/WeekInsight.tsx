import { Activity } from 'lucide-react';
import React from 'react';

interface WeekInsightProps {
    weekInsight: {
        carePlans: number;
        completedQuestions: number;
    };
}

const WeekInsight = ({ weekInsight }: WeekInsightProps) => {
    const { carePlans, completedQuestions } = weekInsight;
    return (
        <div className='border border-gray-200/30 hover:border-gray-200/50 rounded-2xl p-5 bg-white duration-200'>

            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                        <Activity size={18} className="text-blue-600" />
                        This week
                    </h4>
                    <p className="text-sm text-gray-400 mt-0.5">Activities around the week</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-600/90 mt-1.5 shrink-0" />
                    <div>
                        <p className="text-xs font-medium text-foreground">{carePlans} care plans created</p>
                        <p className="text-xs text-muted-foreground">Personalized care plans completed</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600/90 mt-1.5 shrink-0" />
                    <div>
                        <p className="text-xs font-medium text-foreground">{completedQuestions} practice questions</p>
                        <p className="text-xs text-muted-foreground">Practice questions attempted</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekInsight;