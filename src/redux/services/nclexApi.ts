import { IRecentSession, ISessionResult, PerformanceCategorized } from "@/types/NCLEX";
import { baseApi } from "./baseApi";

const nclexApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPerformanceByCategory: builder.query<{ performance_categorized: PerformanceCategorized[] }, void>({
            query: () => '/nclex/performance',
            providesTags: ['Nclex']
        }),
        getRecentPracticeSessions: builder.query<{ recentSessions: IRecentSession[] }, void>({
            query: () => '/nclex/sessions',
            providesTags: ['Nclex']
        }),
        savePracticeSession: builder.mutation<void, { result: ISessionResult }>({
            query: ({ result }) => ({
                url: '/nclex/sessions',
                method: 'POST',
                body: result
            }),
            invalidatesTags: ['Nclex']
        })
    })
})

export const { useGetPerformanceByCategoryQuery, useGetRecentPracticeSessionsQuery, useSavePracticeSessionMutation } = nclexApi;