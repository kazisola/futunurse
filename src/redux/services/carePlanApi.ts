import { ICarePlan } from "@/types/PatientCarePlan";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCarePlans: builder.query<{ carePlans: ICarePlan[] }, void>({
            query: () => '/care-plans',
            providesTags: ['CarePlan']
        })
    })
})

export const { useGetCarePlansQuery } = userApi;