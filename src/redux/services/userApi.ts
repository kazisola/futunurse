import { IUser } from "@/types/User";
import { baseApi } from "./baseApi";

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

type FormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signUpUser: builder.mutation<void, {data: FormData}>({
            query: ({ data }) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data
            })
        }),
        getDashboard: builder.query<{ dashboard: Dashboard}, void>({
            query: () => '/dashboard',
            providesTags: ['User']
        }),
        getUser: builder.query<{ user: IUser }, void>({
            query: () => '/user',
            providesTags: ['User']
        }),
        updateUser: builder.mutation<{ user: IUser }, { data: Partial<IUser> }>({
            query: ({ data }) => ({
                url: '/user',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useSignUpUserMutation, useGetDashboardQuery, useGetUserQuery, useUpdateUserMutation } = userApi;