import { PerformanceCategorized } from "@/types/NCLEX";
import { baseApi } from "./baseApi";

const nclexApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPerformanceByCategory: builder.query<{ performance_categorized: PerformanceCategorized[] }, void>({
            query: () => '/nclex/performance',
            providesTags: ['Nclex']
        })
    })
})

export const { useGetPerformanceByCategoryQuery } = nclexApi;