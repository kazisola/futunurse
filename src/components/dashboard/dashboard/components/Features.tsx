import React from 'react';
import { ChevronRight, Stethoscope, Brain } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        href: "/dashboard/care-plans",
        icon: Stethoscope,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        borderHover: "hover:border-blue-200",
        textColor: "text-blue-600",
        label: "New Care Plan",
        description: "AI-powered NANDA/NIC/NOC care plans",
        cta: "Start now",
        tag: "AI-Powered",
        tagBg: "bg-blue-50 text-blue-500",
    },
    {
        href: "/dashboard/nclex",
        icon: Brain,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        borderHover: "hover:border-emerald-200",
        textColor: "text-emerald-600",
        label: "Practice NCLEX",
        description: "Adaptive NCLEX exam simulation",
        cta: "Begin practice",
        tag: "Adaptive",
        tagBg: "bg-emerald-50 text-emerald-500",
    },
];

const Features = () => {
    return (
        <div className="max-md:hidden col-span-2 max-md:col-span-full grid sm:grid-cols-2 gap-5 max-sm:gap-5">
            {features.map(({ href, icon: Icon, iconBg, iconColor, borderHover, textColor, label, description, cta, tag, tagBg }) => (
                <Link
                    key={href}
                    href={href}
                    className={`group relative bg-white border border-gray-100 ${borderHover} rounded-2xl p-5 duration-200 overflow-hidden flex flex-col gap-3`}
                >

                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${iconBg} opacity-60 blur-2xl pointer-events-none`} />

                    <div className="flex items-start justify-between">
                        <div className={`${iconBg} rounded-xl p-2.5 inline-flex`}>
                            <Icon size={18} className={iconColor} />
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagBg}`}>{tag}</span>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-800 mb-0.5">{label}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                    </div>

                    <div className={`flex items-center gap-1 text-sm font-medium ${textColor} mt-auto`}>
                        {cta}
                        <ChevronRight size={14} className="group-hover:translate-x-1 duration-200 relative top-px" />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Features;