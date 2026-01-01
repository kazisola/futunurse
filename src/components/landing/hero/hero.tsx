"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, CheckCircle } from 'lucide-react';

const Hero = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const float = {
        animate: {
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <section className='relative w-full h-[90vh] overflow-hidden rounded-4xl bg-slate-900'>
            {/* Animated Background Image */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                className='absolute inset-0 z-0'
                style={{
                    backgroundImage: `url('/images/hero-image.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            
            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/70 z-0' />

            <div className='relative flex flex-col items-center justify-center text-center w-full h-full z-10 px-4'>
                
                {/* Floating Badge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white text-sm'
                >
                    <Sparkles size={16} className="text-yellow-400" />
                    <span>The Future of Clinical Prep</span>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className='md:w-8/12 lg:w-6/12 mb-10'
                >
                    <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]'>
                        Master Nursing <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">
                            with AI Intelligence
                        </span>
                    </h1>
                    <p className='text-lg md:text-xl text-white/80 max-w-2xl mx-auto'>
                        Transform your education with our intelligent Care Plan Assistant and NCLEX Smart Coach. 
                        Reduce study time by <span className='text-white font-bold'>70%</span>.
                    </p>
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className='flex flex-col sm:flex-row gap-4'
                >
                    <Button size={'lg'} className='rounded-full px-10 h-14 text-lg bg-blue-600 hover:bg-blue-500 transition-all hover:scale-105 shadow-xl shadow-blue-500/20'>
                        Get Futunurse Free
                    </Button>
                    <Button variant="outline" size={'lg'} className='rounded-full px-10 h-14 text-lg bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10'>
                        Watch Demo
                    </Button>
                </motion.div>

                {/* Floating "Live" UI Elements */}
                <motion.div 
                    variants={float}
                    animate="animate"
                    className='hidden lg:flex absolute left-[10%] top-[25%] bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 items-center gap-3'
                >
                    <div className='bg-emerald-500/20 p-2 rounded-lg'><CheckCircle className='text-emerald-400' /></div>
                    <div className='text-left'>
                        <p className='text-xs text-white/60'>NCLEX Readiness</p>
                        <p className='text-white font-bold'>98% Optimized</p>
                    </div>
                </motion.div>

                <motion.div 
                    variants={float}
                    animate="animate"
                    className='hidden lg:flex absolute right-[10%] bottom-[30%] bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20 items-center gap-3'
                >
                    <div className='bg-blue-500/20 p-2 rounded-lg'><BookOpen className='text-blue-400' /></div>
                    <div className='text-left'>
                        <p className='text-xs text-white/60'>Care Plans</p>
                        <p className='text-white font-bold'>Generated in Secs</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;