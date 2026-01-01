"use client";
import { ChartAreaIcon } from 'lucide-react';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface nclexPerformanceProps {
    nclexTrend: {
        date: string;
        totalQuestions?: number;
        correctAnswers?: number;
        score: number;
    }
}

const NclexPerformance = ({ nclexTrend }: nclexPerformanceProps) => {
    const chartData = Array.isArray(nclexTrend) ? nclexTrend : [nclexTrend];
    return (
        <div className='border border-gray-200/30 hover:border-gray-200/50 rounded-lg p-4 bg-white duration-200'>
            <h4 className='mb-1 flex items-center gap-2.5 font-bold text-slate-800'><ChartAreaIcon size={18} className='text-blue-700' /> Performance Trend</h4>
            <p className='text-sm text-gray-500 mb-5'>Your NCLEX score progression over time</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default NclexPerformance;