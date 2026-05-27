import { IPatient } from '@/types/PatientCarePlan';
import { Activity, FlaskConical, Pill, ShieldAlert, Stethoscope, User } from 'lucide-react';
import React from 'react';

interface PatientInformationProps {
    patient: IPatient;
}

const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
        <p className="text-sm font-semibold text-slate-700 mt-0.5 capitalize">{value || "N/A"}</p>
    </div>
);

const SectionHeader = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
    <div className="flex items-center gap-2 mb-3">
        <Icon size={14} className="text-blue-500 shrink-0" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
);

const PatientInformation = ({ patient }: PatientInformationProps) => {
    const vitals = [
        { label: "Temp (°F)", value: patient.vitals?.temperature },
        { label: "BP (mmHg)", value: patient.vitals?.bloodPressure },
        { label: "HR (bpm)", value: patient.vitals?.heartRate },
        { label: "RR (/min)", value: patient.vitals?.respiratoryRate },
        { label: "SpO₂ (%)", value: patient.vitals?.oxygenSaturation ? `${patient.vitals.oxygenSaturation}%` : null },
        { label: "Pain Level", value: patient.vitals?.painLevel != null ? `${patient.vitals.painLevel} / 10` : null },
    ];

    const clinicalFields = [
        { label: "Primary Diagnoses", value: patient.primaryDiagnoses },
        { label: "Secondary Diagnoses", value: patient.secondaryDiagnoses },
        { label: "Physical Findings", value: patient.physicalFindings },
    ];

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mt-8 mb-10 space-y-5">

            {/* Demographics */}
            <div>
                <SectionHeader icon={User} label="Demographics" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Field label="Age" value={patient.age ? `${patient.age} y/o` : null} />
                    <Field label="Gender" value={patient.gender} />
                    <Field label="Specialty" value={patient.specialty} />
                    <Field label="MRN" value={patient.mrn} />
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Vitals */}
            <div>
                <SectionHeader icon={Activity} label="Vitals" />
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {vitals.map(({ label, value }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                            <span className="text-xs text-gray-400 block mb-1">{label}</span>
                            <p className="text-sm font-bold text-slate-700">{value ?? "N/A"}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Clinical */}
            <div>
                <SectionHeader icon={Stethoscope} label="Clinical" />
                <div className="grid sm:grid-cols-3 gap-4">
                    {clinicalFields.map(({ label, value }) => (
                        <div key={label}>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</span>
                            <p className="text-sm text-slate-700 mt-0.5">{value || "N/A"}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Medications & Allergies */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <SectionHeader icon={Pill} label="Current Medications" />
                    <p className="text-sm text-slate-600 leading-relaxed capitalize">{patient.currentMedications || "N/A"}</p>
                </div>
                <div>
                    <SectionHeader icon={ShieldAlert} label="Allergies" />
                    <p className="text-sm text-slate-600 leading-relaxed capitalize">{patient.allergies || "N/A"}</p>
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Lab Results */}
            <div>
                <SectionHeader icon={FlaskConical} label="Lab Results" />
                <p className="text-sm text-slate-600 leading-relaxed capitalize">{patient.labResults || "N/A"}</p>
            </div>
        </div>
    );
};

export default PatientInformation;