import type { LabCard } from "@/types/companion";
import { AlertTriangle, FlaskConical } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";
import NclexPearl from "./NcleaxPearl";
import Section from "./Section";
import { Separator } from "@/components/ui/separator";
import PillList from "./PillList";
import BulletList from "./BulletList";

const LabCard = ({ card, isSaved }: { card: LabCard, isSaved: boolean }) => {
    return (
        <>
            <header className="flex items-center max-sm:items-start justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="max-sm:hidden bg-rose-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <FlaskConical className="w-6 text-rose-700" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize mb-0 max-sm:flex max-sm:gap-2 max-sm:items-center">{card.name}
                            <span className="sm:hidden rounded-full px-3 bg-rose-100 text-rose-700 capitalize font-medium text-sm">{card.type}</span>
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="max-sm:hidden rounded-full px-3 bg-rose-100 text-rose-700 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.abbreviation}</p>
                        </div>
                    </div>
                </div>
                {!isSaved &&
                    <BookmarkAction card={card} />
                }
            </header>

            <main className="space-y-4 max-h-[calc(100vh-10.7rem)] overflow-y-auto">
                <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-1">Normal Range</p>
                        <p className="text-lg font-bold text-emerald-800">{card.normalRange.adult}</p>
                        {card.normalRange.pediatric && <p className="text-xs text-emerald-600 mt-0.5">Peds: {card.normalRange.pediatric}</p>}
                        {card.normalRange.notes && <p className="text-xs text-emerald-600 mt-1">{card.normalRange.notes}</p>}
                    </div>

                    {(card.criticalValues?.low || card.criticalValues?.high) && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                            <div className="flex items-center gap-1.5 mb-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-red-600">Critical Values</p>
                            </div>
                            <div className="flex gap-4">
                                {card.criticalValues.low && <div><p className="text-[10px] text-red-400 font-medium">LOW</p><p className="text-sm font-bold text-red-700">{card.criticalValues.low}</p></div>}
                                {card.criticalValues.high && <div><p className="text-[10px] text-red-400 font-medium">HIGH</p><p className="text-sm font-bold text-red-700">{card.criticalValues.high}</p></div>}
                            </div>
                        </div>
                    )}
                </div>

                <Section title="What It Measures">
                    <p className="text-sm text-slate-600 leading-relaxed">{card.whatItMeasures}</p>
                </Section>

                <Section title="Specimen Type">
                    <p className="text-sm text-slate-600">{card.specimenType}</p>
                </Section>

                <Separator />

                <Section title="High Result — Possible Causes">
                    <PillList items={card.highResults.possibleCauses} variant="warning" />
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{card.highResults.clinicalSignificance}</p>
                </Section>

                <Section title="Low Result — Possible Causes">
                    <PillList items={card.lowResults.possibleCauses} variant="warning" />
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{card.lowResults.clinicalSignificance}</p>
                </Section>

                <Separator />

                <Section title="Report to Provider If">
                    <BulletList items={card.nursingActions.reportToProviderIf} />
                </Section>

                <Section title="Nursing Interventions">
                    <BulletList items={card.nursingActions.interventions} />
                </Section>

                {card.nursingActions.relatedDrugs?.length > 0 && (
                    <Section title="Related Drugs">
                        <PillList items={card.nursingActions.relatedDrugs} />
                    </Section>
                )}

                <NclexPearl text={card.nclexPearl} />
            </main>
        </>
    )
}

export default LabCard;