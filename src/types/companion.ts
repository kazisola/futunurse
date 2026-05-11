export type CompanionType = "drug" | "lab" | "diagnostic"

export interface DrugCard {
  type: "drug";
  name: string;
  brandNames: string[];
  classification: string;
  mechanismOfAction: string;
  routes: string[];
  dosingRanges: string;
  indications: string[];
  contraindications: string[];
  nursingConsiderations: {
    before: string[];   // Assess / check before giving
    during: string[];   // Monitor while giving
    after: string[];    // Watch for after
  };
  commonSideEffects: string[];
  seriousOrToxicEffects: string[];
  patientTeaching: string[];
  relatedLabs: string[];  // e.g. Digoxin → ["Digoxin level", "Potassium", "Magnesium"]
  nclexPearl: string;
}
 
// Lab Card
export interface LabCard {
  type: "lab";
  name: string;
  abbreviation: string;
  normalRange: {
    adult: string;
    pediatric?: string;
    notes?: string;
  };
  criticalValues: {
    low?: string;
    high?: string;
  };
  whatItMeasures: string;
  highResults: {
    possibleCauses: string[];
    clinicalSignificance: string;
  };
  lowResults: {
    possibleCauses: string[];
    clinicalSignificance: string;
  };
  nursingActions: {
    reportToProviderIf: string[];
    interventions: string[];
    relatedDrugs: string[];  // Drugs that affect this lab
  };
  specimenType: string;   // e.g. "Serum", "Whole blood (EDTA)"
  nclexPearl: string;
}
 
// Diagnostic Card
export interface DiagnosticCard {
  type: "diagnostic";
  name: string;
  purpose: string;
  category: string;  // e.g. "Imaging", "Procedure", "ECG", "Biopsy"
  preProcedurePrep: string[];
  patientTeaching: string[];
  postProcedureCare: string[];
  complicationsToMonitor: string[];
  contraindications: string[];
  normalFindings?: string;
  abnormalFindings?: string;
  nclexPearl: string;
}

export type CompanionCard = DrugCard | LabCard | DiagnosticCard