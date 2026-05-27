import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-toastify';
import { Diagnosis, IPatient } from '@/types/PatientCarePlan';
import { useGenerateCarePlanMutation } from '@/redux/services/carePlanApi';
import { Activity, Pill, Sparkles, Stethoscope, User } from 'lucide-react';

interface PatientFormProps {
    setCurrentStage: Dispatch<SetStateAction<number>>;
    patientData: IPatient;
    setPatientData: Dispatch<SetStateAction<IPatient>>;
    setDiagnoses: Dispatch<SetStateAction<Diagnosis[]>>;
}

const SectionHeader = ({
    icon: Icon,
    label,
    description,
    step,
}: {
    icon: React.ElementType;
    label: string;
    description: string;
    step: number;
}) => (
    <div className="flex items-start gap-4 mb-6">
        <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                <Icon size={16} className="text-white" />
            </div>
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border border-gray-200 text-[9px] font-bold text-gray-500 flex items-center justify-center">
                {step}
            </span>
        </div>
        <div className="pt-0.5">
            <h3 className="font-semibold text-slate-800 text-sm">{label}</h3>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
    </div>
);

const FieldWrapper = ({
    label,
    htmlFor,
    optional,
    children,
}: {
    label: string;
    htmlFor?: string;
    optional?: boolean;
    children: React.ReactNode;
}) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between">
            <Label
                htmlFor={htmlFor}
                className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest"
            >
                {label}
            </Label>
            {optional && (
                <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wide">
                    Optional
                </span>
            )}
        </div>
        {children}
    </div>
);

const VitalTile = ({
    label,
    unit,
    field,
    type = "text",
    patientData,
    updateVital,
}: {
    label: string;
    unit: string;
    field: string;
    type?: string;
    patientData: IPatient;
    updateVital: (field: string, value: unknown) => void;
}) => (
    <div className="group relative bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-3.5 transition-colors duration-150">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="text-[10px] text-gray-300 font-medium">{unit}</span>
        </div>
        <Input
            type={type}
            placeholder="—"
            className="border-0 border-b border-dashed border-gray-200 rounded-none px-0 h-7 text-sm font-semibold text-slate-700 placeholder:text-gray-300 focus-visible:ring-0 focus-visible:border-blue-400 bg-transparent"
            value={(patientData.vitals as Record<string, unknown>)[field] as string || ''}
            onChange={e => updateVital(field, type === "number" ? Number(e.target.value) : e.target.value)}
        />
    </div>
);

const PatientForm = ({ setCurrentStage, patientData, setPatientData, setDiagnoses }: PatientFormProps) => {
    const [generateCarePlan, { isLoading: generatingLoading }] = useGenerateCarePlanMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCurrentStage(2);
            const response = await generateCarePlan({ data: patientData }).unwrap();
            setDiagnoses(response?.care_plan?.diagnoses || []);
            setCurrentStage(3);
        } catch (error: unknown) {
            let message = "AI service is currently unavailable.";
            if (typeof error === "object" && error !== null && "data" in error) {
                const data = (error as { data?: { message?: string } }).data;
                if (data?.message) message = data.message;
            } else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message);
            setCurrentStage(1);
        }
    };

    const update = (field: keyof IPatient, value: unknown) =>
        setPatientData(prev => ({ ...prev, [field]: value }));

    const updateVital = (field: string, value: unknown) =>
        setPatientData(prev => ({ ...prev, vitals: { ...prev.vitals, [field]: value } }));

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">

            {/* Demographics */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <SectionHeader
                    icon={User}
                    step={1}
                    label="Patient Demographics"
                    description="Core identifying information. Name, age, and primary diagnosis are required."
                />
                <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4">
                    <FieldWrapper label="Full Name" htmlFor="name">
                        <Input id="name" type="text" placeholder="e.g. Mike Anderson" required
                            value={patientData.name || ''}
                            onChange={e => update('name', e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Age" htmlFor="age">
                        <Input id="age" type="number" placeholder="e.g. 55" required
                            value={patientData.age || ''}
                            onChange={e => update('age', Number(e.target.value))}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Biological Sex">
                        <Select value={patientData.gender ?? ""} onValueChange={v => update('gender', v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </FieldWrapper>
                    <FieldWrapper label="Nursing Specialty">
                        <Select value={patientData.specialty ?? ""} onValueChange={v => update('specialty', v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medical surgical">Medical-Surgical</SelectItem>
                                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                <SelectItem value="OB/GYN">OB/GYN</SelectItem>
                                <SelectItem value="phsychiatric">Psychiatric</SelectItem>
                                <SelectItem value="critical care">Critical Care</SelectItem>
                                <SelectItem value="community health">Community Health</SelectItem>
                            </SelectContent>
                        </Select>
                    </FieldWrapper>
                    <FieldWrapper label="MRN" htmlFor="mrn" optional>
                        <Input id="mrn" type="text" placeholder="e.g. 2858146"
                            value={patientData.mrn || ''}
                            onChange={e => update('mrn', e.target.value)}
                        />
                    </FieldWrapper>
                </div>

                <div className="h-px bg-gray-50 my-4" />

                <div className="grid sm:grid-cols-2 gap-4">
                    <FieldWrapper label="Primary Diagnoses" htmlFor="primary-diagnoses">
                        <Input id="primary-diagnoses" type="text"
                            placeholder="e.g. Congestive Heart Failure, COPD"
                            required
                            value={patientData.primaryDiagnoses || ''}
                            onChange={e => update('primaryDiagnoses', e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Secondary Diagnoses" htmlFor="secondary-diagnoses" optional>
                        <Input id="secondary-diagnoses" type="text"
                            placeholder="Comma-separated"
                            value={patientData.secondaryDiagnoses || ''}
                            onChange={e => update('secondaryDiagnoses', e.target.value)}
                        />
                    </FieldWrapper>
                </div>
            </div>

            {/* Vitals */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <SectionHeader
                    icon={Activity}
                    step={2}
                    label="Vital Signs"
                    description="Current hemodynamic and physiological readings."
                />
                <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-3">
                    {[
                        { label: "Temperature", unit: "°F", field: "temperature", type: "number" },
                        { label: "Blood Pressure", unit: "mmHg", field: "bloodPressure" },
                        { label: "Heart Rate", unit: "bpm", field: "heartRate" },
                        { label: "Respiratory Rate", unit: "/min", field: "respiratoryRate" },
                        { label: "Oxygen Sat.", unit: "SpO₂ %", field: "oxygenSaturation" },
                        { label: "Pain Level", unit: "0 – 10", field: "painLevel", type: "number" },
                    ].map(v => (
                        <VitalTile key={v.field} {...v} patientData={patientData} updateVital={updateVital} />
                    ))}
                </div>
            </div>

            {/* Clinical Assessment */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <SectionHeader
                    icon={Stethoscope}
                    step={3}
                    label="Clinical Assessment"
                    description="Head-to-toe findings, lab values, and diagnostic results."
                />
                <div className="space-y-4">
                    <FieldWrapper label="Laboratory Results" htmlFor="labresult" optional>
                        <Textarea
                            id="labresult"
                            placeholder="CBC, BMP, ABG, coagulation panels, cultures…"
                            className="resize-none min-h-[80px] text-sm"
                            value={patientData.labResults || ''}
                            onChange={e => update('labResults', e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Physical Assessment Findings" htmlFor="physical-findings" optional>
                        <Textarea
                            id="physical-findings"
                            placeholder="Head-to-toe assessment, symptoms, patient complaints, neurological status…"
                            className="resize-none min-h-[80px] text-sm"
                            value={patientData.physicalFindings || ''}
                            onChange={e => update('physicalFindings', e.target.value)}
                        />
                    </FieldWrapper>
                </div>
            </div>

            {/* Medications & Allergies */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <SectionHeader
                    icon={Pill}
                    step={4}
                    label="Medications & Allergies"
                    description="Active medications with dosages and any known allergies or sensitivities."
                />
                <div className="grid sm:grid-cols-2 gap-4">
                    <FieldWrapper label="Current Medications" htmlFor="current-medications" optional>
                        <Input id="current-medications" type="text"
                            placeholder="Metoprolol 25mg BID, Lasix 40mg QD…"
                            value={patientData.currentMedications || ''}
                            onChange={e => update('currentMedications', e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Allergies" htmlFor="allergies" optional>
                        <Input id="allergies" type="text"
                            placeholder="Penicillin, Sulfa, Latex…"
                            value={patientData.allergies || ''}
                            onChange={e => update('allergies', e.target.value)}
                        />
                    </FieldWrapper>
                </div>
            </div>

            {/* Submit */}
            <div>
                <Button
                    disabled={generatingLoading}
                    type="submit"
                    className="h-12 w-full rounded-full gap-2 font-semibold shadow-sm shadow-blue-100"
                >
                    <Sparkles size={14} />
                    {generatingLoading ? "Generating…" : "Generate Care Plan"}
                </Button>
            </div>
        </form>
    );
};

export default PatientForm;