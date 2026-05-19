"use client";
import React, { useState } from 'react';
import NewPlanStage from './components/NewPlanStage';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientForm from './components/PatientForm';
import GeneratingPlanAnimation from './components/GeneratingPlanAnimation';
import ReviewAndEditPlan from './components/ReviewAndEditPlan';
import { ToastContainer } from "react-toastify";
import { Diagnosis, IPatient } from '@/types/PatientCarePlan';

export const NewCarePlan = () => {
    const [currentStage, setCurrentStage] = useState<number>(1);
    const [patientData, setPatientData] = useState<IPatient>({
        // Patient Demographics
        name: null,
        age: null,
        gender: null,
        specialty: null,
        mrn: null,
        primaryDiagnoses: null,
        secondaryDiagnoses: null,
        // Patient Vitals & Assesment
        vitals: {
            temperature: null,
            bloodPressure: null,
            heartRate: null,
            respiratoryRate: null,
            oxygenSaturation: null,
            painLevel: null
        },
        labResults: null,
        physicalFindings: null,
        currentMedications: null,
        allergies: null
    })
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    return (
        <div>
            <NewPlanStage currentStage={currentStage} />
            {currentStage === 1 ?
                (
                    // <Tabs defaultValue="manual" className='rounded-md'>
                    //     <TabsList className='py-6'>
                    //         <TabsTrigger value={"manual"} className='w-44 py-5 text-sm cursor-pointer'>Manual Entry</TabsTrigger>
                    //         <TabsTrigger value={"template"} className='w-44 py-5 text-sm cursor-pointer'>Use Template</TabsTrigger>
                    //     </TabsList>
                    //     <TabsContent value={"manual"}>
                    //         <PatientForm currentStage={currentStage} setCurrentStage={setCurrentStage} patientData={patientData} setPatientData={setPatientData} setDiagnoses={setDiagnoses} />
                    //     </TabsContent>
                    //     <TabsContent value={"template"}>Template content</TabsContent>
                    // </Tabs>
                    <PatientForm setCurrentStage={setCurrentStage} patientData={patientData} setPatientData={setPatientData} setDiagnoses={setDiagnoses} />
                )
                :
                currentStage === 2 ?
                    (
                        <GeneratingPlanAnimation currentStage={currentStage} setCurrentStage={setCurrentStage} />
                    )
                    :
                    <ReviewAndEditPlan patientData={patientData} setPatientData={setPatientData} diagnoses={diagnoses} setCurrentStage={setCurrentStage} />
            }
            <ToastContainer />
        </div>
    );
};