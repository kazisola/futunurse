import { Search } from 'lucide-react';
import React from 'react';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5.6rem)] max-lg:h-full max-lg:py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-700 mb-1.5">Search anything clinical</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mb-8">
                Type a drug name, lab test, or diagnostic procedure to get an instant nursing-focused breakdown
            </p>
        </div>
    )
}

export default EmptyState;