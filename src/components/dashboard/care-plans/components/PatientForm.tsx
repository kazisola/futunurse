import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from "axios";
import { toast } from 'react-toastify';
import { IPatient } from '@/types/PatientCarePlan';

interface PatientFormProps {
    currentStage: number;
    setCurrentStage: Dispatch<SetStateAction<number>>;
    patientData: IPatient;
    setPatientData: Dispatch<SetStateAction<IPatient>>;
    setDiagnoses: Dispatch<SetStateAction<[]>>
}

const PatientForm = ({ currentStage, setCurrentStage, patientData, setPatientData, setDiagnoses }: PatientFormProps) => {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStage(2);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE}/api/care-plan/create-care-plan`,
                patientData
            );

            if (response.status === 200) {
                setDiagnoses(response.data?.care_plan?.diagnoses || []);
                setCurrentStage(3);
            } else {
                // unexpected success status
                console.warn("Unexpected response status:", response.status);
                toast.error("Something went wrong! Please try again.");
                setCurrentStage(1);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Server responded
                if (err.response.status === 422) {
                    // Soft warning toast, no stage reset
                    toast("Care plan generation failed. Give it another try!");
                    setCurrentStage(1);
                } else {
                    // Other server errors
                    console.error("Server Error:", err.response.data);
                    toast.error("Server error occurred. Please try again later.");
                    setCurrentStage(1);
                }
            } else if (axios.isAxiosError(err) && err.request) {
                // Network error
                console.error("No response received:", err.request);
                toast.error("Network error. Please check your connection and try again.");
                setCurrentStage(1);
            } else {
                // Other unexpected errors
                console.error("Unexpected error:", err);
                toast.error("Failed to generate care plan. Please try again.");
                setCurrentStage(1);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} className=' border-gray-900/10 bg-white/80 backdrop-blur-xl rounded-md p-6 w-full'>
            <div className='space-y-3'>
                <div className='mb-7'>
                    <h3 className='font-semibold text-xl text-gray-800'>Patient Demographics</h3>
                    <p className='text-sm text-gray-600'>Enter as many possible fields to get the most efficient care plan</p>
                </div>
                <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-3'>
                    <div className='space-y-2.5'>
                        <Label htmlFor='name'>Patient name</Label>
                        <Input type="text" placeholder='Mike Anderson' id="name" required
                            value={patientData.name || ''}
                            onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                        />
                    </div>
                    <div className='space-y-2.5'>
                        <Label htmlFor='age'>Patient age</Label>
                        <Input type="number" placeholder='55' id="age" required
                            value={patientData.age || ''}
                            onChange={(e) => setPatientData({ ...patientData, age: Number(e.target.value) })}
                        />
                    </div>
                    <div className='space-y-2.5 w-full'>
                        <Label htmlFor='gender'>Gender</Label>
                        <Select
                            value={patientData.gender ?? ""}
                            onValueChange={(value) => setPatientData({ ...patientData, gender: value as "male" | "female" })}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2.5 w-full'>
                        <Label htmlFor='specialty'>Specialty</Label>
                        <Select
                            value={patientData.specialty ?? ""}
                            onValueChange={(value) => setPatientData({ ...patientData, specialty: value as "medical surgical" | "pediatrics" | "OB/GYN" | "phsychiatric" | "critical care" | "community health" })}
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="medical surgical">Medical-Surgical</SelectItem>
                                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                <SelectItem value="obgyn">OB/GYN</SelectItem>
                                <SelectItem value="phsychiatric">Phsychiatric</SelectItem>
                                <SelectItem value="critical care">Critical Care</SelectItem>
                                <SelectItem value="community health">Community Health</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='space-y-2.5'>
                        <Label htmlFor='mrn'>MRN</Label>
                        <Input type="text" placeholder='e.g., 2858146' id="mrn"
                            value={patientData.mrn || ''}
                            onChange={(e) => setPatientData({ ...patientData, mrn: e.target.value })}
                        />
                    </div>
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='primary-diagnoses'>Primary Diagnoses</Label>
                    <Input type="text" placeholder='e.g., Congestive Heart Failure, COPD Exacerbation' id="primary-diagnoses" required
                        value={patientData.primaryDiagnoses || ''}
                        onChange={(e) => setPatientData({ ...patientData, primaryDiagnoses: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='secondary-diagnoses'>Secondary Diagnoses</Label>
                    <Input type="text" placeholder='List secondary diagnoses separated by commas' id="secondary-diagnoses"
                        value={patientData.secondaryDiagnoses || ''}
                        onChange={(e) => setPatientData({ ...patientData, secondaryDiagnoses: e.target.value })}
                    />
                </div>
            </div>
            <hr className='mt-8' />
            <div className='space-y-3 mt-5'>
                <div className='mb-5'>
                    <h3 className='font-semibold text-xl text-gray-800'>Vital Signs & Assesment</h3>
                    <p className='text-sm text-gray-600'>Enter patient&apos;s vital signs & available assesment</p>
                </div>
                <div className='space-y-2'>
                    <Label>Current Vital Signs</Label>
                    <div className='grid grid-cols-3 max-md:grid-cols-2 gap-3'>
                        <Input type="number" placeholder='Temp (F)'
                            value={patientData.vitals.temperature || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, temperature: Number(e.target.value) } })}
                        />
                        <Input type="text" placeholder='BP (mmHg)'
                            value={patientData.vitals.bloodPressure || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, bloodPressure: e.target.value } })}
                        />
                        <Input type="text" placeholder='HR (bpm)'
                            value={patientData.vitals.heartRate || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, heartRate: e.target.value } })} />
                        <Input type="text" placeholder='RR (/min)'
                            value={patientData.vitals.respiratoryRate || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, respiratoryRate: e.target.value } })}
                        />
                        <Input type="text" placeholder='SpO₂ (%)'
                            value={patientData.vitals.oxygenSaturation || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, oxygenSaturation: e.target.value } })}
                        />
                        <Input type="number" placeholder='Pain (0-10)' min={0} max={10}
                            value={patientData.vitals.painLevel || ''}
                            onChange={(e) => setPatientData({ ...patientData, vitals: { ...patientData.vitals, painLevel: Number(e.target.value) } })}
                        />
                    </div>
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='labresult'>Laboratory Results</Label>
                    <Textarea id="labresult" placeholder='Enter relevant lab values (CBC, BMP, ABG, etc.)'
                        value={patientData.labResults || ''}
                        onChange={(e) => setPatientData({ ...patientData, labResults: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='physical-findings'>Physical Assesment Findings</Label>
                    <Textarea id="physical-findings" placeholder='Enter head-to-toe assesment findings, symptom, patient complaints...'
                        value={patientData.physicalFindings || ''}
                        onChange={(e) => setPatientData({ ...patientData, physicalFindings: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='current-medications'>Current Medications</Label>
                    <Input type="text" placeholder='List current medications with doses separated by commas' id="current-medications"
                        value={patientData.currentMedications || ''}
                        onChange={(e) => setPatientData({ ...patientData, currentMedications: e.target.value })}
                    />
                </div>
                <div className='space-y-2.5'>
                    <Label htmlFor='allergies'>Allergies</Label>
                    <Input type="text" placeholder='List known allergies separated by commas' id="allergies"
                        value={patientData.allergies || ''}
                        onChange={(e) => setPatientData({ ...patientData, allergies: e.target.value })}
                    />
                </div>
            </div>
            <Button type="submit" className='w-full h-12 text-base mt-7 rounded-full'>Generate Care Plan</Button>
        </form>
    );
};

export default PatientForm;