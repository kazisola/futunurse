"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, Award, Activity, HeartPulse, BrainCircuit, Target } from 'lucide-react';

const ProgressTracking = () => {
    const stats = [
        { label: "Clinical Hours", value: "120/500", progress: 65, icon: <Activity className="text-teal-500" /> },
        { label: "NCLEX Prep", value: "88% Score", progress: 88, icon: <Target className="text-blue-500" /> },
        { label: "Care Plans", value: "24 Completed", progress: 45, icon: <BrainCircuit className="text-purple-500" /> },
    ];

    return (
        <section className="py-32 bg-[#FBFDFF] overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20 max-w-7xl mx-auto">
                    
                    {/* Visual Side: The "Dashboard" Card */}
                    <div className="lg:w-1/2 relative w-full">
                        {/* Decorative Background Glow */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-100/40 rounded-full blur-[120px]" />
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-slate-100 p-8 md:p-12 relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Clinical Mastery</h4>
                                    <p className="text-sm text-slate-400 font-medium tracking-wide">Updated 2m ago</p>
                                </div>
                                <div className="p-3 bg-teal-50 rounded-2xl">
                                    <TrendingUp className="text-teal-600" />
                                </div>
                            </div>

                            {/* Growth Bars */}
                            <div className="space-y-8">
                                {stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                                                    {stat.icon}
                                                </div>
                                                <span className="font-bold text-slate-700 text-sm uppercase tracking-wider">{stat.label}</span>
                                            </div>
                                            <span className="font-black text-slate-900 text-sm">{stat.value}</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${stat.progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 }}
                                                className={`h-full rounded-full bg-linear-to-r from-teal-500 to-blue-400`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating "Achievement" Badge */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -right-4 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-4 border-white"
                            >
                                <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
                                    <Award size={24} className="text-slate-900" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Unlocked</p>
                                    <p className="text-sm font-bold">Top 5% of Students</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Micro-Element */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 hidden md:flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center animate-pulse">
                                <HeartPulse size={20} className="text-red-500" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 tracking-tight">Live Feedback Active</span>
                        </motion.div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-teal-600 font-black text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                                <span className="w-10 h-0.5 bg-teal-600" />
                                Analytics & Insight
                            </p>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] -tracking-tighter">
                                Visualize your <br />
                                <span className="text-teal-600 underline decoration-teal-100 decoration-8 underline-offset-8">Clinical Growth.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-xl">
                                Don&apos;t just study—track your evolution. Our intelligent dashboard identifies your clinical weak points and turns them into strengths before you step into the hospital.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <h5 className="font-black text-slate-900 text-sm mb-1 tracking-tight">Real-time Insights</h5>
                                    <p className="text-xs text-slate-400 font-medium">Get instant feedback on your care plans.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <h5 className="font-black text-slate-900 text-sm mb-1 tracking-tight">Weakness Mapping</h5>
                                    <p className="text-xs text-slate-400 font-medium">See where you need focus for the NCLEX.</p>
                                </div>
                            </div>

                            <Button className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-teal-600 transition-all font-black group">
                                View Your Dashboard
                                <TrendingUp className="ml-3 w-5 h-5 group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgressTracking;