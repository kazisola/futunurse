"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Timer, Zap, Brain, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const StudyEfficiency = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section id="why-us" className="py-32 bg-white relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 skew-x-12 -z-10 translate-x-20" />

            <div className="container mx-auto px-6 lg:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-24">

                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="mb-6 font-black text-xs tracking-[0.3em] text-blue-600 uppercase flex items-center gap-3">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                                </span>
                                Focus on High Yield
                            </p>

                            <h2 className="font-bold text-4xl md:text-6xl text-slate-900 mb-8 leading-[1.1] -tracking-tighter">
                                Study Smarter, <br />
                                <span className="text-blue-600 italic">Not Longer.</span>
                            </h2>

                            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                                Nursing school isn&apos;t about memorizing more—it&apos;s about <span className="text-slate-900 font-bold underline decoration-blue-200 decoration-4">thinking clinically</span>. 
                                Futunurse filters the noise so you can master patient safety and real-world decision-making.
                            </p>
                        </motion.div>

                        <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            {[
                                { title: "Eliminate low-yield content", desc: "Focus only on concepts that actually appear on exams.", icon: <Zap size={18} /> },
                                { title: "Prioritize & Delegate", desc: "Learn to recognize unsafe answers instantly.", icon: <Brain size={18} /> },
                                { title: "Reduce Academic Burnout", desc: "Study with structure, intent, and clarity.", icon: <Timer size={18} /> }
                            ].map((item, idx) => (
                                <motion.li key={idx} variants={itemVariants} className="flex gap-4 group">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button size="lg" className="rounded-2xl h-16 px-10 mt-12 bg-blue-600 hover:bg-slate-900 text-white font-bold text-lg transition-all group shadow-xl shadow-blue-200">
                                Start Smarter Studying
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <Image
                                src="/images/nurse-with-device.webp"
                                alt="Focused nursing student"
                                width={600}
                                height={600}
                                className="rounded-[3rem] object-cover shadow-2xl border-12 border-white aspect-square"
                            />
                            
                            {/* Floating "Efficiency" Card */}
                            <motion.div 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-4xl shadow-2xl border border-slate-50 hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency Boost</p>
                                        <p className="text-xl font-black text-slate-900">+4.5hrs <span className="text-sm font-medium text-slate-400">/day</span></p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating "Concept" Card */}
                            <motion.div 
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-6 -right-6 bg-blue-600 p-4 rounded-2xl shadow-xl text-white flex items-center gap-3 md:flex"
                            >
                                <CheckCircle2 size={20} className="text-blue-200" />
                                <span className="text-sm font-bold tracking-tight">Clinical Logic Applied</span>
                            </motion.div>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-100 rounded-full -z-10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-50 rounded-full -z-20" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StudyEfficiency;