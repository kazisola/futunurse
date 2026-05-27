"use client";
import { Stethoscope } from 'lucide-react';
import React from 'react';
import {
    PolarAngleAxis, PolarGrid, PolarRadiusAxis,
    Radar, RadarChart, ResponsiveContainer, Tooltip
} from 'recharts';

interface StrengthPoint {
    category: string;
    averageScore: number;
}

interface StrengthProps {
    strength: StrengthPoint | StrengthPoint[];
}

const formatCategory = (value: string) =>
    value.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const { category, averageScore } = payload[0]?.payload ?? {};
    const isPassing = averageScore >= 70;
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-sm min-w-[140px]">
            <p className="text-gray-400 text-xs mb-1.5 font-medium">{formatCategory(category)}</p>
            <p className="font-bold text-slate-800 text-2xl leading-none tracking-tight">{averageScore}%</p>
            <span className={`text-xs font-semibold mt-2 inline-flex items-center gap-1 ${isPassing ? 'text-emerald-500' : 'text-rose-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isPassing ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                {isPassing ? 'Proficient' : 'Needs work'}
            </span>
        </div>
    );
};

const CustomAngleTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
    const label = formatCategory(payload.value);
    const words = label.split(" ");
    const isRight = x > cx + 5;
    const isLeft = x < cx - 5;
    const anchor = isRight ? 'start' : isLeft ? 'end' : 'middle';
    const dx = isRight ? 6 : isLeft ? -6 : 0;

    return (
        <text
            x={x + dx}
            y={y}
            textAnchor={anchor}
            dominantBaseline="central"
            fontSize={11}
            fill="#94a3b8"
            fontFamily="inherit"
        >
            {words.map((word: string, i: number) => (
                <tspan key={i} x={x + dx} dy={i === 0 ? (words.length > 1 ? '-0.5em' : '0') : '1.2em'}>
                    {word}
                </tspan>
            ))}
        </text>
    );
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[260px] gap-4">
        <div className="bg-violet-50 border border-violet-100 rounded-full p-3">
            <Stethoscope size={24} className="text-violet-400" />
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">No domain data yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Complete practice sessions across nursing domains to see your radar
            </p>
        </div>
        <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-full bg-violet-100"
                    style={{ width: `${[24, 16, 32, 20, 28][i]}px` }} />
            ))}
        </div>
    </div>
);

const StrengthsRadar = ({ strength }: StrengthProps) => {
    const data = Array.isArray(strength) ? strength : strength ? [strength] : [];
    const hasData = data.length > 0;

    const avg = hasData ? Math.round(data.reduce((s, d) => s + d.averageScore, 0) / data.length) : null;
    const strongest = hasData ? data.reduce((a, b) => a.averageScore > b.averageScore ? a : b) : null;
    const weakest = hasData ? data.reduce((a, b) => a.averageScore < b.averageScore ? a : b) : null;

    return (
        <div className="border border-gray-200/30 hover:border-gray-200/50 rounded-2xl p-5 bg-white duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="flex items-center gap-2 font-bold text-slate-800">
                        <Stethoscope size={18} className="text-violet-600" />
                        Strengths & Weaknesses
                    </h4>
                    <p className="text-sm text-gray-400 mt-0.5">Performance by nursing domain</p>
                </div>

                {hasData && (
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-xs text-gray-400">Avg</p>
                            <p className="text-base font-bold text-slate-800">{avg}%</p>
                        </div>
                        {strongest && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Best</p>
                                <p className="text-base font-bold text-emerald-500">{strongest.averageScore.toFixed(1)}%</p>
                            </div>
                        )}
                        {weakest && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Weakest</p>
                                <p className="text-base font-bold text-rose-400">{weakest.averageScore.toFixed(1)}%</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {hasData ? (
                <div style={{ height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius={90} data={data}>
                            <defs>
                                <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.25} />
                                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05} />
                                </radialGradient>
                            </defs>

                            <PolarGrid
                                stroke="#f1f5f9"
                                strokeWidth={1}
                                gridType="polygon"
                            />
                            <PolarAngleAxis
                                dataKey="category"
                                tick={<CustomAngleTick />}
                                axisLine={false}
                                tickLine={false}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tickCount={4}
                                tick={{ fontSize: 10, fill: '#cbd5e1' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${v}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Radar
                                name="averageScore"
                                dataKey="averageScore"
                                stroke="#7c3aed"
                                strokeWidth={2.5}
                                fill="url(#radarFill)"
                                dot={{ fill: '#7c3aed', stroke: 'white', strokeWidth: 2.5, r: 5 }}
                                activeDot={{ r: 7, fill: '#7c3aed', stroke: 'white', strokeWidth: 2.5 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <EmptyState />
            )}

            {/* Legend */}
            {hasData && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-violet-600 inline-block" />
                        Domain score
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        {formatCategory(strongest!.category)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                        {formatCategory(weakest!.category)}
                    </span>
                </div>
            )}
        </div>
    );
};

export default StrengthsRadar;