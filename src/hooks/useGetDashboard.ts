"use client";
import axios from "axios";
import { useEffect, useState } from "react"

type AISuggestion = {
    title: string;
    score?: number;
    description: string;
    type: "weakness" | "strength" | "pattern";
}

type Dashboard = {
    carePlans: {
        number_of_care_plans: number;
        number_of_week_care_plans: number;
    };
    nclexInsights: {
        total_completed_questions: number;
        week_completed_questions: number;
        overall_score: number;
    },
    nclexTrend: {
        date: string;
        totalQuestions?: number;
        correctAnswers?: number;
        score: number;
    },
    performanceByCategory: {
        category: string;
        averageScore: number;
    },
    suggestions: AISuggestion[]
};


export const useGetDashboard = () => {
    const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const handleFetchDashboard = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/api/dashboard`);
                // console.log(response.data);
                setDashboardData(response.data?.dashboard);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        };
        handleFetchDashboard();
    }, [])
    return { dashboardData, loading };
}