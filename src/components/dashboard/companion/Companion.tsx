import React from 'react';
import FeaturePanel from './components/FeaturePanel';

export const Companion = () => {
    return (
        <div className='grid grid-cols-4 gap-3'>
            <FeaturePanel />
            <section className='col-span-3 border border-red-400'>
                Hello World
            </section>
        </div>
    )
}