import type { DiagnosticCard } from "@/types/companion";
import { Stethoscope } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";
import NclexPearl from "./NcleaxPearl";
import Section from "./Section";
import PillList from "./PillList";
import { Separator } from "@/components/ui/separator";
import BulletList from "./BulletList";

const DiagnosticCard = ({ card }: { card: DiagnosticCard }) => {
    return (
        <>
            <header className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-violet-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <Stethoscope className="w-6 text-violet-700" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize">{card.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-3 bg-violet-100 text-violet-700 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.category}</p>
                        </div>
                    </div>
                </div>
                <BookmarkAction card={card} />
            </header>

            <main className="space-y-4 max-h-[calc(100vh-10.1rem)] overflow-y-auto">
                {/* <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Category</p>
                        <p className="text-sm font-medium text-slate-700">{card.category}</p>
                    </div>
                </div> */}

                <Section title="Purpose">
                    <p className="text-sm text-slate-600 leading-relaxed">{card.purpose}</p>
                </Section>

                <Separator />

                <Section title="Pre-Procedure Prep">
                    <BulletList items={card.preProcedurePrep} />
                </Section>

                <Section title="Patient Teaching">
                    <BulletList items={card.patientTeaching} />
                </Section>

                <Section title="Post-Procedure Care">
                    <BulletList items={card.postProcedureCare} />
                </Section>

                <Section title="Complications to Monitor">
                    <PillList items={card.complicationsToMonitor} variant="danger" />
                </Section>

                {card.contraindications?.length > 0 && (
                    <Section title="Contraindications">
                        <PillList items={card.contraindications} variant="warning" />
                    </Section>
                )}

                {card.normalFindings && (
                    <Section title="Normal Findings">
                        <p className="text-sm text-slate-600">{card.normalFindings}</p>
                    </Section>
                )}

                {card.abnormalFindings && (
                    <Section title="Abnormal Findings">
                        <p className="text-sm text-slate-600">{card.abnormalFindings}</p>
                    </Section>
                )}

                <NclexPearl text={card.nclexPearl} />
            </main>
        </>
    )
}

export default DiagnosticCard;