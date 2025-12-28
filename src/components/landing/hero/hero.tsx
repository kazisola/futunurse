import { Button } from '@/components/ui/button';
import { LucidePlayCircle } from 'lucide-react';
import React from 'react';

const Hero = () => {
    return (
        <section className='w-full h-screen rounded-4xl'
            style={{
                backgroundImage: `url('/images/hero-image.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='flex flex-col items-center justify-center text-center w-full h-full relative'>
                <div className='absolute h-full w-full top-0 left-0 bg-black/60 rounded-4xl'></div>
                <div className='md:w-6/12 w-11/12 mb-20 z-10'>
                    <h3 className='text-5xl max-md:text-4xl max-sm:text-3xl font-bold text-white mt-4 mb-6 md:leading-16'>Master Nursing Studies with AI-Powered Learning Guide</h3>
                    <p className='text-lg text-white/80'>Transform your nursing education with our intelligent Care Plan Assistant and NCLEX Smart Coach. Reduce study time by 70% while improving your clinical skills.</p>
                </div>
                <div className='flex items-center gap-3 max-sm:gap-2 z-10'>
                    <Button size={'lg'} className='rounded-full w-56 h-12 max-sm:h-11 font-medium text-base'>Get Futunurse</Button>
                    {/* <Button size={'lg'} className='bg-white text-black hover:bg-white/90 rounded-full w-44 max-sm:w-40 h-12 max-sm:h-11 font-medium group'>Watch demo <LucidePlayCircle size={30} className='animate-pulse-dot' /></Button> */}
                </div>
            </div>
        </section>
    );
};

export default Hero;