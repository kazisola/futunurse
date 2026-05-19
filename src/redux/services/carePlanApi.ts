import { Diagnosis, ICarePlan, IPatient } from "@/types/PatientCarePlan";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateCarePlan: builder.mutation<{ success: boolean; care_plan: { diagnoses: Diagnosis[] } }, { data: IPatient }>({
            query: ({ data }) => ({
                url: '/care-plans/generate',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['CarePlan']
        }),
        saveCarePlan: builder.mutation<void, { patientData: IPatient, diagnoses: Diagnosis[] }>({
            query: ({ patientData, diagnoses }) => ({
                url: '/care-plans',
                method: 'POST',
                body: { patientData, diagnoses }
            }),
            invalidatesTags: ['CarePlan']
        }),
        getCarePlans: builder.query<{ carePlans: ICarePlan[] }, void>({
            query: () => '/care-plans',
            providesTags: ['CarePlan']
        }),
        getCarePlan: builder.query<{ carePlan: ICarePlan }, { id: string }>({
            query: ({ id }) => `/care-plans/${id}`,
            providesTags: ['CarePlan']
        }),
        bookmarkCarePlan: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `/care-plans/${id}/bookmark`,
                method: 'PATCH'
            }),
            invalidatesTags: ['CarePlan']
        }),
        deleteCarePlan: builder.mutation<void, { id: string }>({
            query: ({ id }) => ({
                url: `care-plans/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['CarePlan']
        })
    })
})

export const { useGenerateCarePlanMutation, useSaveCarePlanMutation, useGetCarePlansQuery, useGetCarePlanQuery, useBookmarkCarePlanMutation, useDeleteCarePlanMutation } = userApi;