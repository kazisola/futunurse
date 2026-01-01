"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, ArrowRight, ShieldCheck, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
    return (
        <section id={"pricing"} className="relative py-32 bg-white overflow-hidden">
            {/* Soft Ambient Background Blobs */}
            <div className="absolute top-1/4 -left-20 w-150 h-150 bg-teal-50/50 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                    
                    <div className="lg:w-1/3 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6"
                        >
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            Academic Excellence
                        </motion.div>
                        <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-[1.1] -tracking-tighter">
                            A plan for every <span className="text-teal-600">Nursing Journey.</span>
                        </h2>
                        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                            Start with the basics or unlock clinical mastery. Join thousands of students who have traded stress for smart study tools.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm">98%</div>
                                <p className="text-sm text-slate-600 font-medium italic">NCLEX Pass Rate for Pro users</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 w-full grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[3rem] p-2 bg-slate-100/50 border border-slate-200 backdrop-blur-3xl relative">
                        
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="p-10 flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Base Tier</p>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">The Freebie</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-black text-slate-900">$0</span>
                                    <span className="text-slate-400 text-sm font-medium">/ forever</span>
                                </div>
                                
                                <ul className="space-y-4 mb-12">
                                    {["3 AI Care Plans/wk", "Standard Question Bank", "Drug Reference Guide"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                                            <Check size={16} className="text-teal-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button variant="ghost" className="w-full h-14 rounded-2xl border border-slate-300 text-slate-700 hover:bg-white hover:shadow-md transition-all font-bold">
                                Get Started
                            </Button>
                        </motion.div>

                        <motion.div 
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            className="relative p-10 bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white flex flex-col justify-between overflow-hidden"
                        >
                            {/* Animated Background Glow for Pro */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
                            
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
                                        <Crown size={24} />
                                    </div>
                                    <div className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
                                        Best Value
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Elite Pro</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-5xl font-black text-slate-900">$12</span>
                                    <span className="text-slate-400 text-sm font-medium">/ month</span>
                                </div>
                                <p className="text-[10px] font-bold text-teal-600 uppercase mb-8">Billed annually ($144)</p>
                                
                                <ul className="space-y-4 mb-12">
                                    {["Unlimited AI Generation", "Next-Gen NCLEX Sim", "Personalized Mentor AI", "Priority Clinical Lab"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-800 text-sm font-semibold">
                                            <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center text-white">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10">
                                <Button className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-teal-600 text-white font-black text-lg transition-all duration-300 shadow-xl group">
                                    Unlock Everything
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <ShieldCheck size={14} className="text-teal-500" />
                                    No-Risk 7-Day Refund Policy
                                </div>
                            </div>

                            {/* Floating Pass Badge */}
                            <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-32 -right-4 bg-white shadow-2xl rounded-2xl p-3 border border-slate-100 flex items-center gap-3 md:flex"
                            >
                                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white">
                                    <Zap size={16} fill="white" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-800 leading-tight">PASS <br/> GUARANTEE</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;