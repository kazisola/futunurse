"use client";
import React, { useState } from "react";
import SubmitForm from "./SubmitForm";
import { CompanionType } from "@/types/companion";

const FeaturePanel = () => {
    const [query, setQuery] = useState<string>("");
    const [type, setType] = useState<CompanionType | null>(null);
    console.log(query, type)
    return (
        <aside className='col-span-1 border border-red-400 p-2 space-y-4'>
            <header>
                <h4 className='text-lg font-semibold text-slate-950'>Drug & Lab Companion</h4>
                <p className='text-sm font-medium text-slate-800'>Instant nursing references</p>
            </header>
            <SubmitForm query={query} setQuery={setQuery} type={type} setType={setType} />
        </aside>
    )
}

export default FeaturePanel;