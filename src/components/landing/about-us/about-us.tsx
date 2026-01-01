"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, Stethoscope, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const AboutUsSection = () => {
    const features = [
        {
            icon: <Check size={18} />,
            title: 'AI Care Plans',
            description: 'Generate accurate NANDA care plans instantly with AI',
            color: 'bg-emerald-500',
            shadow: 'shadow-emerald-500/20'
        },
        {
            icon: <CheckCircle size={18} />,
            title: 'NCLEX Coach',
            description: 'Smart, personalized NCLEX prep with adaptive quizzes',
            color: 'bg-blue-600',
            shadow: 'shadow-blue-600/20'
        },
        {
            icon: <Stethoscope size={18} />,
            title: 'Clinical Scenarios',
            description: 'Practice real patient cases to build clinical confidence',
            color: 'bg-purple-600',
            shadow: 'shadow-purple-600/20'
        },
    ];

    // Container animation for staggering children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id='about' className="py-24 overflow-hidden bg-slate-50/50">
            <div className="container mx-auto px-6 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                    
                    {/* Image Side with Decorative Elements */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: -50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative max-md:order-2 flex justify-center"
                    >
                        {/* Decorative Background Shape */}
                        <div className="absolute -top-6 -left-6 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
                        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                        
                        <div className="relative z-10 group">
                            <motion.div
                                whileHover={{ scale: 1.02, rotate: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Image
                                    src="/images/nurse-tablet.jpg"
                                    alt="Futunurse Clinical Tools"
                                    width={600}
                                    height={600}
                                    className="rounded-[2.5rem] shadow-2xl object-cover aspect-square w-full max-w-[500px] border-8 border-white"
                                />
                            </motion.div>
                            
                            {/* Floating Overlay Badge */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -left-6 md:left-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
                            >
                                <div className="h-10 w-10 bg-teal-500 rounded-full flex items-center justify-center text-white">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Clinical Accuracy</p>
                                    <p className="text-sm font-bold text-slate-800">Verified by Educators</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="max-md:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="mb-4 font-bold text-sm tracking-[0.2em] text-teal-600 uppercase flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-teal-600"></span>
                                Discover Futunurse
                            </p>

                            <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                Learn Smarter, <span className="text-teal-600">Practice Better</span>, and Pass with Confidence
                            </h2>

                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Futunurse is built for the next generation of nurses who deserve modern,
                                powerful tools. We blend intelligent automation with clinical accuracy 
                                to help you stay ahead in school and feel ready for real patient care.
                            </p>
                        </motion.div>

                        <motion.ul 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-6 mb-10"
                        >
                            {features.map((feature, index) => (
                                <motion.li 
                                    key={index} 
                                    variants={itemVariants}
                                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className={`shrink-0 w-12 h-12 rounded-xl ${feature.color} ${feature.shadow} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-slate-800 mb-1">{feature.title}</h4>
                                        <p className="text-slate-600 leading-snug">{feature.description}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button size="lg" className="rounded-full px-8 h-14 text-base group bg-slate-900 hover:bg-teal-600 transition-colors">
                                Try Futunurse Now
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;