"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import SubmitForm from "./SubmitForm";
import { CompanionCard, CompanionType } from "@/types/companion";
import Suggestions from "./Suggestions";
import { Separator } from "@/components/ui/separator";
import SavedCards from "./SavedCards";

interface FeaturePanelProps {
    setCard: Dispatch<SetStateAction<CompanionCard | null>>;
    responseLoading: boolean;
    setResponseLoading: Dispatch<SetStateAction<boolean>>
}

const FeaturePanel = ({ setCard, responseLoading, setResponseLoading }: FeaturePanelProps) => {
    const [query, setQuery] = useState<string>("");
    const [type, setType] = useState<CompanionType | null>(null);
    return (
        <aside className='col-span-1 bg-white rounded-md p-3 space-y-4'>
            <header>
                <h4 className='text-lg font-semibold text-slate-950'>Drug & Lab Companion</h4>
                <p className='text-sm font-medium text-slate-800'>Instant nursing references</p>
            </header>
            <SubmitForm query={query} setQuery={setQuery} type={type} setType={setType} setCard={setCard} responseLoading={responseLoading} setResponseLoading={setResponseLoading} />
            <Separator />
            <Suggestions />
            <Separator />
            <SavedCards />
        </aside>
    )
}

export default FeaturePanel;