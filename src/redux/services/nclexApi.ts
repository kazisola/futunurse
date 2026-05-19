import { IRecentSession, PerformanceCategorized } from "@/types/NCLEX";
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
        })
    })
})

export const { useGetPerformanceByCategoryQuery, useGetRecentPracticeSessionsQuery } = nclexApi;