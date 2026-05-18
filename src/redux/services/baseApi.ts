import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE,
        credentials: 'include'
        // prepareHeaders: (headers, { getState }) => {
        //     // Attach auth token
        //     const token = (getState() as RootState).auth?.token;
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`)
        //     }
        //     return headers;
        // }
    }),
    tagTypes: ["User", "CarePlan", "Companion"],
    endpoints: () => ({}),
})