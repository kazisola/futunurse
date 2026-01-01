"use client";
import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, ClipboardPlus, GraduationCap, Stethoscope, CheckCircle, Shield, ArrowUpRight } from "lucide-react";

const features = [
    { icon: <Brain size={30} />, title: "AI Care Plan Generator", description: "Create accurate NANDA care plans in seconds using intelligent automation.", availability: true, color: "bg-teal-600" },
    { icon: <GraduationCap size={30} />, title: "NCLEX Smart Coach", description: "Adaptive quizzes and personalized study routes built around your weak areas.", availability: true, color: "bg-blue-600" },
    { icon: <Stethoscope size={30} />, title: "Clinical Skills Practice", description: "Hands-on scenarios that simulate real patient interactions and skill checks.", availability: false, color: "bg-emerald-600" },
    { icon: <ClipboardPlus size={30} />, title: "Drug & Lab Companion", description: "Instant explanations of drugs, labs, diagnostics, and safe nursing considerations.", availability: false, color: "bg-indigo-600" },
    { icon: <CheckCircle size={30} />, title: "Daily Study Planner", description: "Organize your study schedule with reminders and progress tracking.", availability: false, color: "bg-cyan-600" },
    { icon: <Shield size={30} />, title: "Evidence‑Based Content", description: "All materials follow ANA, NANDA, and NCLEX standards for accuracy.", availability: true, color: "bg-slate-700" }
];

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!ref.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
    };
    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const FeaturesSection = () => {
    const sectionRef = useRef(null);
    const ghostRef = useRef<HTMLDivElement>(null); // The track inside
    const [scrollRange, setScrollRange] = useState(0);

    // This calculates the exact width of the cards so the scroll never "ends early"
    useLayoutEffect(() => {
        if (ghostRef.current) {
            setScrollRange(ghostRef.current.scrollWidth - window.innerWidth);
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });

    // Map scroll to the calculated range
    const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange - 100]);
    const x = useSpring(xTransform, { stiffness: 100, damping: 20 });

    return (
        <section id="features" ref={sectionRef} className="relative h-[400vh] bg-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="flex flex-col w-full">
                    
                    {/* Header */}
                    <div className="px-8 md:px-32 mb-12 md:mb-16">
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-4"
                        >
                            Powerful AI Suite
                        </motion.p>
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
                            The Tools You Need <br className="hidden md:block" />
                            <span className="text-slate-400">to Become a Great Nurse.</span>
                        </h2>
                    </div>

                    {/* Sliding Track */}
                    <motion.div 
                        ref={ghostRef}
                        style={{ x }} 
                        className="flex gap-6 md:gap-8 px-8 md:px-32 will-change-transform"
                    >
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="group w-[85vw] md:w-112.5 shrink-0 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                                <div>
                                    <div className={`mb-8 w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white shadow-lg`}>
                                        {f.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{f.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-12">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${f.color} animate-pulse`} />
                                        <span className="font-bold text-xs tracking-widest text-slate-400 uppercase">{f.availability ? 'Available Now' : 'Coming Soon'}</span>
                                    </div>

                                    <MagneticButton>
                                        <button className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 transition-colors">
                                            <ArrowUpRight size={24} />
                                        </button>
                                    </MagneticButton>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;