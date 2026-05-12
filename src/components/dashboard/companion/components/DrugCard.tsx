import type { DrugCard } from "@/types/companion";
import { Pill } from "lucide-react";
import React from "react";
import BookmarkAction from "./BookmarkAction";
import NclexPearl from "./NcleaxPearl";
import Section from "./Section";
import PillList from "./PillList";
import { Separator } from "@/components/ui/separator";
import BulletList from "./BulletList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DrugCard = ({ card }: { card: DrugCard }) => {
    return (
        <>
            <header className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 w-12 h-12 rounded-md flex items-center justify-center">
                        <Pill className="w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-950 text-lg capitalize mb-0">{card.name}</h3>
                        <div className="flex items-center gap-2">
                            <span className="rounded-full px-3 bg-blue-100 text-blue-600 capitalize font-medium text-sm">{card.type}</span>
                            <p className="text-gray-600">{card.brandNames.join(" • ")}</p>
                        </div>
                    </div>
                </div>
                <BookmarkAction card={card} />
            </header>

            <main className="space-y-4 max-h-[calc(100vh-10.1rem)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Classification</p>
                        <p className="text-sm font-medium text-slate-700">{card.classification}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Routes</p>
                        <p className="text-sm font-medium text-slate-700">{card.routes.join(", ")}</p>
                    </div>
                </div>

                {card.brandNames?.length > 0 && (
                    <Section title="Brand Names">
                        <PillList items={card.brandNames} />
                    </Section>
                )}

                <Section title="Mechanism of Action">
                    <p className="text-sm text-slate-600 leading-relaxed">{card.mechanismOfAction}</p>
                </Section>

                <Section title="Dosing">
                    <p className="text-sm text-slate-600">{card.dosingRanges}</p>
                </Section>

                <Section title="Indications">
                    <PillList items={card.indications} />
                </Section>

                <Section title="Contraindications">
                    <PillList items={card.contraindications} variant="warning" />
                </Section>

                <Separator />

                <Section title="Nursing Considerations">
                    <Tabs defaultValue="before" className="w-full">
                        <TabsList className="h-8 rounded-md bg-muted p-1">
                            <TabsTrigger
                                value="before"
                                className="h-6 rounded-sm px-3 text-sm"
                            >
                                Before
                            </TabsTrigger>

                            <TabsTrigger
                                value="during"
                                className="h-6 rounded-sm px-3 text-sm"
                            >
                                During
                            </TabsTrigger>

                            <TabsTrigger
                                value="after"
                                className="h-6 rounded-sm px-3 text-sm"
                            >
                                After
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="before">
                            <BulletList items={card.nursingConsiderations.before} />
                        </TabsContent>

                        <TabsContent value="during">
                            <BulletList items={card.nursingConsiderations.during} />
                        </TabsContent>

                        <TabsContent value="after">
                            <BulletList items={card.nursingConsiderations.after} />
                        </TabsContent>
                    </Tabs>
                </Section>

                <Separator />

                <Section title="Common Side Effects">
                    <PillList items={card.commonSideEffects} />
                </Section>

                <Section title="Serious / Toxic Effects">
                    <PillList items={card.seriousOrToxicEffects} variant="danger" />
                </Section>

                <Section title="Patient Teaching">
                    <BulletList items={card.patientTeaching} />
                </Section>

                {card.relatedLabs?.length > 0 && (
                    <Section title="Related Labs to Monitor">
                        <PillList items={card.relatedLabs} />
                    </Section>
                )}

                <NclexPearl text={card.nclexPearl} />
            </main>
        </>
    )
}

export default DrugCard;