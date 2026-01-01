"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, BrainCircuit } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Setup Motion Values for Mouse Position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. Smooth out the movement with Springs
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to center (0,0)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // 3. Create different "depth" transforms for different elements
    const card1X = useTransform(mouseX, (val) => val / 15);
    const card1Y = useTransform(mouseY, (val) => val / 15);
    
    const card2X = useTransform(mouseX, (val) => val / -20);
    const card2Y = useTransform(mouseY, (val) => val / -20);

    const bgMovement = useTransform(mouseX, (val) => val / 50);

    return (
        <section 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className='relative w-full h-[95vh] overflow-hidden rounded-4xl bg-[#020617] cursor-default'
        >
            {/* Parallax Background */}
            <motion.div 
                style={{ x: bgMovement, scale: 1.1 }}
                className='absolute inset-0 z-0 opacity-60'
            >
                <div 
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url('/images/hero-image.jpg')` }}
                />
            </motion.div>
            
            <div className='absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/40 to-slate-950 z-0' />

            <div className='relative flex flex-col items-center justify-center text-center w-full h-full z-10 px-6'>
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-8 flex items-center gap-2 bg-blue-500/10 backdrop-blur-xl border border-blue-400/30 px-5 py-2 rounded-full text-blue-200 text-sm font-medium'
                >
                    <BrainCircuit size={18} className="text-blue-400 animate-pulse" />
                    <span>Next-Gen Nursing Intelligence</span>
                </motion.div>

                <div className='md:w-10/12 lg:w-8/12 mb-12'>
                    <motion.h1 
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }}
                        className='text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter'
                    >
                        Learn Faster. <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-emerald-400">
                            Nurse Better.
                        </span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed'
                    >
                        Your AI-powered bridge from the classroom to the clinic. 
                        Smart Care Plans, NCLEX prep, and clinical confidence.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className='flex flex-wrap justify-center gap-5'
                >
                    <Button size={'lg'} className='rounded-full px-12 h-16 text-xl bg-blue-600 hover:bg-blue-500 hover:scale-105 transition-transform shadow-[0_0_40px_rgba(37,99,235,0.4)]'>
                        Start Free Trial
                    </Button>
                    <Button variant="outline" size={'lg'} className='rounded-full px-12 h-16 text-xl border-slate-700 hover:text-white hover:bg-white/5 backdrop-blur-md'>
                        View Features
                    </Button>
                </motion.div>

                {/* Left Card - "Deep" layer */}
                <motion.div 
                    style={{ x: card1X, y: card1Y }}
                    className='hidden xl:flex absolute left-[8%] top-[20%] bg-white/5 backdrop-blur-2xl p-6 rounded-4xl border border-white/10 shadow-2xl items-center gap-5'
                >
                    <div className='bg-emerald-500/20 p-3 rounded-2xl'><CheckCircle className='text-emerald-400' size={28} /></div>
                    <div className='text-left'>
                        <p className='text-sm text-slate-400 font-medium'>Study Efficiency</p>
                        <p className='text-white text-2xl font-bold'>+70%</p>
                    </div>
                </motion.div>

                {/* Right Card - "Shallow" layer */}
                <motion.div 
                    style={{ x: card2X, y: card2Y }}
                    className='hidden xl:flex absolute right-[8%] bottom-[25%] bg-white/5 backdrop-blur-2xl p-6 rounded-4xl border border-white/10 shadow-2xl items-center gap-5'
                >
                    <div className='bg-blue-500/20 p-3 rounded-2xl'><BookOpen className='text-blue-400' size={28} /></div>
                    <div className='text-left'>
                        <p className='text-sm text-slate-400 font-medium'>Smart Coach</p>
                        <p className='text-white text-xl font-bold'>24/7 Support</p>
                    </div>
                </motion.div>
            </div>

            {/* Subtle bottom glow */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/10 blur-[100px] pointer-events-none' />
        </section>
    );
};

export default Hero;