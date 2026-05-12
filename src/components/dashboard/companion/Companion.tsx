"use client";
import React, { useState } from 'react';
import FeaturePanel from './components/FeaturePanel';
import { CompanionCard } from '@/types/companion';
import DrugCard from './components/DrugCard';
import LabCard from './components/LabCard';
import DiagnosticCard from './components/DiagnosticCard';
import EmptyState from './components/EmptyState';

export const Companion = () => {
    const [card, setCard] = useState<CompanionCard | null>(null);
    const [responseLoading, setResponseLoading] = useState<boolean>(false);
    const componentsMap: Record<
        CompanionCard["type"],
        React.ComponentType<{ card: CompanionCard }>
    > = {
        drug: DrugCard as React.ComponentType<{ card: CompanionCard }>,
        lab: LabCard as React.ComponentType<{ card: CompanionCard }>,
        diagnostic: DiagnosticCard as React.ComponentType<{ card: CompanionCard }>
    };
    const ActiveCard = card?.type ? componentsMap[card.type] : null;
    return (
        <div className='grid grid-cols-4 gap-3'>
            <FeaturePanel setCard={setCard} responseLoading={responseLoading} setResponseLoading={setResponseLoading} />
            <section className='col-span-3 bg-white rounded-md p-3'>
                {
                    responseLoading ? (
                        <div>
                            Thinking...
                        </div>
                    )
                        :
                        (
                            ActiveCard && card ? (
                                <ActiveCard card={card} />
                            )
                                :
                                (
                                    <EmptyState />
                                )
                        )
                }
            </section>
        </div>
    )
}