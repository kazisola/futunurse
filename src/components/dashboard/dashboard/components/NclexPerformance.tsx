"use client";
import { ChartAreaIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts';

import type {
  TooltipContentProps,
} from "recharts";

import type {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface NclexTrendPoint {
    date: string;
    totalQuestions?: number;
    correctAnswers?: number;
    score: number;
}

interface NclexPerformanceProps {
    nclexTrend: NclexTrendPoint | NclexTrendPoint[];
}

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-[300px] gap-4">
        <div className="relative">
            <svg width="180" height="90" viewBox="0 0 180 90" fill="none" className="opacity-10">
                <polyline points="0,70 30,55 60,60 90,35 120,40 150,20 180,25"
                    stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,85 30,75 60,80 90,60 120,65 150,45 180,50"
                    stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-50 border border-blue-100 rounded-full p-3">
                    <TrendingUp size={24} className="text-blue-400" />
                </div>
            </div>
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">No data yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px] leading-relaxed">
                Complete practice sessions to start tracking your score trend
            </p>
        </div>
        <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-full bg-blue-100"
                    style={{ width: `${[24, 16, 32, 20, 28][i]}px` }} />
            ))}
        </div>
    </div>
);

const CustomTooltip = ({ active, payload, label }: TooltipContentProps<ValueType, NameType>) => {
    if (!active || !payload?.length) return null;
    const score = payload[0]?.value;
    const isPassing = score >= 70;
    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3 text-sm min-w-[130px]">
            <p className="text-gray-400 text-xs mb-1.5 font-medium">{formatDate(String(label ?? ''))}</p>
            <p className="font-bold text-slate-800 text-2xl leading-none tracking-tight">{score}%</p>
            <span className={`text-xs font-semibold mt-2 inline-flex items-center gap-1 ${isPassing ? 'text-emerald-500' : 'text-rose-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isPassing ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                {isPassing ? 'Passing' : 'Below passing'}
            </span>
        </div>
    );
};

interface CustomDotProps {
    cx?: number;
    cy?: number;
    payload?: NclexTrendPoint;
}
const CustomDot = ({ cx, cy, payload }: CustomDotProps) => {
    if (cx == null || cy == null || !payload) return null;

    const isPassing = payload.score >= 70;
    const color = isPassing ? '#3b82f6' : '#f87171';

    return (
        <g>
            <circle cx={cx} cy={cy} r={14} fill={color} fillOpacity={0.1} />
            <circle cx={cx} cy={cy} r={6} fill={color} stroke="white" strokeWidth={2.5} />
        </g>
    );
};

interface XAxisTickProps {
    x?: number;
    y?: number;
    payload?: {
        value: string;
    };
}
const CustomXAxisTick = ({ x = 0, y = 0, payload }: XAxisTickProps) => (
    <text x={x} y={y + 14} textAnchor="middle" fontSize={11} fill="#94a3b8" fontFamily="inherit">
        {payload?.value ? formatDate(payload.value) : ''}
    </text>
);

const NclexPerformance = ({ nclexTrend }: NclexPerformanceProps) => {
    const chartData = Array.isArray(nclexTrend) ? nclexTrend : nclexTrend ? [nclexTrend] : [];
    const hasData = chartData.length > 0;

    const latest = hasData ? chartData[chartData.length - 1].score : null;
    const avg = hasData ? Math.round(chartData.reduce((s, d) => s + d.score, 0) / chartData.length) : null;
    const trend = hasData && chartData.length > 1
        ? chartData[chartData.length - 1].score - chartData[0].score
        : null;

    const TrendIcon = trend === null ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
    const trendColor = trend === null ? '' : trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-rose-400' : 'text-gray-400';

    return (
        <div className="border border-gray-200/30 hover:border-gray-200/50 rounded-2xl p-5 bg-white duration-200">
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                        <ChartAreaIcon size={18} className="text-blue-600" />
                        Performance trend
                    </h4>
                    <p className="text-sm text-gray-400 mt-0.5">Your NCLEX score progression over time</p>
                </div>

                {hasData && (
                    <div className="flex gap-4">
                        {[
                            { label: 'Latest', value: `${latest}%` },
                            { label: 'Avg', value: `${avg}%` },
                        ].map(({ label, value }) => (
                            <div key={label} className="text-right">
                                <p className="text-xs text-gray-400">{label}</p>
                                <p className="text-sm font-semibold text-slate-800">{value}</p>
                            </div>
                        ))}
                        {trend !== null && TrendIcon && (
                            <div className="text-right">
                                <p className="text-xs text-gray-400">Change</p>
                                <p className={`text-sm font-semibold flex items-center justify-end gap-0.5 ${trendColor}`}>
                                    <TrendIcon size={14} />
                                    {Math.abs(trend)}%
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {hasData ? (
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

                        <ReferenceLine
                            y={70}
                            stroke="#10b981"
                            strokeDasharray="5 4"
                            strokeWidth={1.5}
                            label={{
                                value: 'Passing 70%',
                                position: 'insideTopRight',
                                fontSize: 11,
                                fill: '#10b981',
                                fontWeight: 600,
                                dy: -6,
                            }}
                        />

                        <XAxis
                            dataKey="date"
                            tick={<CustomXAxisTick />}
                            axisLine={false}
                            tickLine={false}
                            height={30}
                        />
                        <YAxis
                            domain={[0, 100]}
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `${v}`}
                            ticks={[0, 25, 50, 70, 100]}
                        />

                        <Tooltip content={CustomTooltip} cursor={{ stroke: '#e2e8f0', strokeWidth: 1.5, strokeDasharray: '4 3' }} />

                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#scoreGradient)"
                            dot={<CustomDot />}
                            activeDot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <EmptyState />
            )}

            {hasData && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="w-3 h-0.5 bg-blue-500 rounded-full inline-block" />
                        Score
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="w-4 border-t border-dashed border-emerald-400 inline-block" />
                        Passing (70%)
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                        Below passing
                    </span>
                </div>
            )}
        </div>
    );
};

export default NclexPerformance;