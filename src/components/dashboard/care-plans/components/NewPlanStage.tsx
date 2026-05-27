import React from 'react';
import { Check, PencilLine, Sparkles, User } from 'lucide-react';

interface StageProps {
  currentStage: number;
}

const NewPlanStage = ({ currentStage }: StageProps) => {
  const stages = [
    { id: 1, label: 'Patient Intake', sublabel: 'Demographics & vitals', icon: User },
    { id: 2, label: 'AI Generation', sublabel: 'Building care plan', icon: Sparkles },
    { id: 3, label: 'Review & Edit', sublabel: 'Finalize & save', icon: PencilLine },
  ];

  return (
    <div className="lg:w-3xl max-md:hidden mx-auto flex items-center mb-10">
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        const isCurrent = stage.id === currentStage;
        const isCompleted = stage.id < currentStage;
        const isLast = index === stages.length - 1;

        return (
          <React.Fragment key={stage.id}>
            {/* Step */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Icon bubble */}
              <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? 'bg-blue-600 shadow-sm shadow-blue-200'
                  : isCurrent
                    ? 'bg-blue-600 shadow-sm shadow-blue-200'
                    : 'bg-gray-100'
              }`}>
                {isCompleted
                  ? <Check size={16} className="text-white" strokeWidth={2.5} />
                  : <Icon size={16} className={isCurrent ? 'text-white' : 'text-gray-400'} />
                }
                {/* Pulse ring on current */}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-xl ring-2 ring-blue-400 ring-offset-2 animate-pulse" />
                )}
              </div>

              {/* Labels */}
              <div>
                <p className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
                  isCurrent || isCompleted ? 'text-slate-800' : 'text-gray-400'
                }`}>
                  {stage.label}
                </p>
                <p className={`text-xs mt-0.5 transition-colors duration-200 ${
                  isCurrent ? 'text-blue-500' : isCompleted ? 'text-gray-400' : 'text-gray-300'
                }`}>
                  {stage.sublabel}
                </p>
              </div>
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="flex-1 mx-4 h-px relative overflow-hidden rounded-full bg-gray-100">
                <div className={`absolute inset-y-0 left-0 rounded-full bg-blue-500 transition-all duration-500 ${
                  isCompleted ? 'w-full' : 'w-0'
                }`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NewPlanStage;