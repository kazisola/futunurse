"use client";
import React, { Dispatch, SetStateAction } from "react";
import SubmitForm from "./SubmitForm";
import { CompanionCard, CompanionType } from "@/types/companion";
import Suggestions from "./Suggestions";
import { Separator } from "@/components/ui/separator";
import SavedCards from "./SavedCards";

interface FeaturePanelProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    type: CompanionType | null;
    setType: Dispatch<SetStateAction<CompanionType | null>>;
    setCard: Dispatch<SetStateAction<CompanionCard | null>>;
    responseLoading: boolean;
    setResponseLoading: Dispatch<SetStateAction<boolean>>
}

const FeaturePanel = ({ query, setQuery, type, setType, setCard, responseLoading, setResponseLoading }: FeaturePanelProps) => {
    return (
        <aside className='col-span-3 bg-white border border-gray-100 rounded-2xl p-5 space-y-4'>
            <header>
                <h4 className='text-lg font-semibold text-slate-950'>Drug & Lab Companion</h4>
                <p className='text-sm text-gray-600'>Instant nursing references</p>
            </header>
            <SubmitForm query={query} setQuery={setQuery} type={type} setType={setType} setCard={setCard} responseLoading={responseLoading} setResponseLoading={setResponseLoading} />
            <Separator />
            <Suggestions setQuery={setQuery} setCard={setCard} responseLoading={responseLoading} setResponseLoading={setResponseLoading} />
            <Separator />
            <SavedCards setCard={setCard} />
        </aside>
    )
}

export default FeaturePanel;