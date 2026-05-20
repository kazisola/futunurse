"use client";
import React, { useState } from 'react';
import FeaturePanel from './components/FeaturePanel';
import { CompanionCard, CompanionType } from '@/types/companion';
import DrugCard from './components/DrugCard';
import LabCard from './components/LabCard';
import DiagnosticCard from './components/DiagnosticCard';
import EmptyState from './components/EmptyState';
import AiLoadingAnimation from './components/AiLoadingAnimation';
import { useGetSavedCardsQuery } from '@/redux/services/companionApi';
import CompanionSkeleton from './components/CompanionSkeleton';

export const Companion = () => {
    const [query, setQuery] = useState<string>("");
    const [type, setType] = useState<CompanionType | null>(null);

    const [card, setCard] = useState<CompanionCard | null>(null);

    const [responseLoading, setResponseLoading] = useState<boolean>(false);

    const { data: { saved_cards } = {}, isLoading: cardsLoading } = useGetSavedCardsQuery();

    if(cardsLoading || !saved_cards) return <CompanionSkeleton />

    const isSaved = saved_cards.some(s_card => s_card.type == card?.type && s_card.query == card?.name)

    const componentsMap: Record<
        CompanionCard["type"],
        React.ComponentType<{ card: CompanionCard, isSaved: boolean }>
    > = {
        drug: DrugCard as React.ComponentType<{ card: CompanionCard, isSaved: boolean }>,
        lab: LabCard as React.ComponentType<{ card: CompanionCard, isSaved: boolean }>,
        diagnostic: DiagnosticCard as React.ComponentType<{ card: CompanionCard, isSaved: boolean }>
    };
    const ActiveCard = card?.type ? componentsMap[card.type] : null;
    return (
        <div className='lg:grid grid-cols-10 gap-3 max-lg:space-y-6'>
            <FeaturePanel query={query} setQuery={setQuery} type={type} setType={setType} setCard={setCard} responseLoading={responseLoading} setResponseLoading={setResponseLoading} />
            <section className='col-span-7 bg-white rounded-md p-4'>
                {
                    responseLoading ? (
                        <AiLoadingAnimation isVisible={true} title={`Generating ${query || "companion"} card`} />
                    )
                        :
                        (
                            ActiveCard && card ? (
                                <ActiveCard card={card} isSaved={isSaved} />
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