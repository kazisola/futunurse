import { Button } from '@/components/ui/button';
import { CheckCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const StudyEfficiency = () => {
    return (
        <section id="why-us" className="py-28">
            <div className="lg:px-32 max-sm:p-5 grid grid-cols-2 items-center gap-10 max-md:grid-cols-1">

                {/* Text */}
                <div>
                    <p className="mb-5 font-semibold text-lg text-blue-600 uppercase flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse-dot"></span>
                        Study Efficiency
                    </p>

                    <h2 className="font-bold text-3xl text-gray-800 mb-4">
                        Study Smarter, Not Longer
                    </h2>

                    <p className="text-base text-gray-700 mb-6">
                        Nursing school isn’t about memorizing more—it’s about thinking clinically.
                        Futunurse helps you focus on what actually matters for patient safety,
                        exams, and real-world decision-making.
                    </p>

                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <CheckCircle size={17} className='text-blue-600 relative top-0.5' />
                            <p className="text-sm text-gray-700">
                                Eliminate low-yield content and focus on high-impact clinical concepts
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle size={17} className='text-blue-600 relative top-0.5' />
                            <p className="text-sm text-gray-700">
                                Learn how to prioritize, delegate, and recognize unsafe answers
                            </p>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle size={17} className='text-blue-600 relative top-0.5' />
                            <p className="text-sm text-gray-700">
                                Reduce burnout by studying with structure and clinical intent
                            </p>
                        </li>
                    </ul>

                    <Button size="lg" className="rounded-full mt-10 bg-blue-600 hover:bg-blue-700">
                        Start Smarter Studying
                    </Button>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <Image
                        src="/images/nurse-with-device.webp"
                        alt="Focused nursing student studying efficiently"
                        width={500}
                        height={500}
                        className="rounded-3xl object-cover w-120 h-120 max-sm:h-96"
                    />
                </div>

            </div>
        </section>

    );
};

export default StudyEfficiency;