import React from 'react';
import { Diagnosis } from '@/types/PatientCarePlan';
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, Target, Stethoscope, CheckCircle2, GraduationCap, BookOpen, Clock } from "lucide-react"

interface DiagnosesProps {
    diagnoses: Diagnosis[];
}

const Diagnoses = ({ diagnoses }: DiagnosesProps) => {
    const getPriorityColor = (priority: "High" | "Medium" | "Low") => {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-800 border-red-300"
            case "Medium":
                return "bg-amber-100 text-amber-800 border-amber-300"
            case "Low":
                return "bg-teal-100 text-teal-800 border-teal-300"
        }
    }
    return (
        <div className="space-y-8">
            {diagnoses.map((dx, index) => (
                <div key={index} className="border-2 border-slate-300 rounded-2xl bg-white">
                    <div className="bg-slate-100 border-b-2 border-slate-300 p-5 rounded-t-2xl">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-teal-600 text-white font-bold text-lg px-3 py-1 rounded">#{index + 1}</div>
                                <Badge className={`${getPriorityColor(dx.priority)} border font-semibold px-3 py-1`}>
                                    {dx.priority.toUpperCase()} PRIORITY
                                </Badge>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">{dx.nandaLabel}</h2>
                        <p className="text-base text-slate-700 leading-relaxed italic">{dx.statement}</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Defining Characteristics */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                    <AlertCircle className="w-5 h-5 text-teal-600" />
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                                        Defining Characteristics
                                    </h3>
                                </div>
                                <ul className="space-y-2">
                                    {dx.definingCharacteristics?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                            <span className="text-teal-600 font-bold mt-0.5">•</span>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Related Factors */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                    <TrendingUp className="w-5 h-5 text-teal-600" />
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Related Factors</h3>
                                </div>
                                <ul className="space-y-2">
                                    {dx.relatedFactors?.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                            <span className="text-teal-600 font-bold mt-0.5">•</span>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                <Target className="w-5 h-5 text-teal-600" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                                    Expected Outcomes / Goals
                                </h3>
                            </div>
                            <div className="border border-slate-300">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-300">
                                            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase w-32">Timeframe</th>
                                            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase">Goal Statement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-200">
                                            <td className="p-3 align-top">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-teal-600" />
                                                    <span className="text-sm font-semibold text-slate-900">Short-term</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-sm text-slate-700 leading-relaxed">{dx.goals?.shortTerm}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 align-top">
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-4 h-4 text-blue-600" />
                                                    <span className="text-sm font-semibold text-slate-900">Long-term</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-sm text-slate-700 leading-relaxed">{dx.goals?.longTerm}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className=''>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                <Stethoscope className="w-5 h-5 text-teal-600" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                                    Nursing Interventions & Rationales
                                </h3>
                            </div>
                            <div className="border border-slate-300">
                                <table className="w-full max-sm:table-fixed">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-300">
                                            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase w-12">#</th>
                                            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase">
                                                Nursing Intervention
                                            </th>
                                            <th className="text-left p-3 text-xs font-bold text-slate-700 uppercase">
                                                Scientific Rationale
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dx.interventions?.map((item, i) => (
                                            <tr key={i} className={`${i !== dx.interventions.length - 1 ? "border-b border-slate-200" : ""} align-top`}>
                                                <td className="p-3">
                                                    <div className="bg-teal-600 text-white font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center">
                                                        {i + 1}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-sm text-slate-900 leading-relaxed font-medium">{item.action}</td>
                                                <td className="p-3 text-sm text-slate-700 leading-relaxed">{item.rationale}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Evaluation Criteria</h3>
                            </div>
                            <div className="bg-slate-50 border border-slate-300 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {dx.evaluationCriteria?.map((item, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <div className="w-5 h-5 border-2 border-teal-600 rounded flex-shrink-0 mt-0.5 flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                                            </div>
                                            <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                <GraduationCap className="w-5 h-5 text-teal-600" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Patient Education</h3>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 p-4">
                                <p className="text-sm text-slate-700 leading-relaxed">{dx.patientEducation}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-300">
                                <BookOpen className="w-5 h-5 text-slate-600" />
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">References</h3>
                            </div>
                            <div className="space-y-2">
                                {dx.references?.map((ref, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-teal-600 font-mono font-bold text-sm flex-shrink-0">[{i + 1}]</span>
                                        <p className="text-xs text-slate-600 leading-relaxed">{ref}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Diagnoses;