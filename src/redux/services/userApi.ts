import { IUser } from "@/types/User";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<{ user: IUser }, void>({
            query: () => '/user',
            providesTags: ['User']
        }),
        updateUser: builder.mutation<{ user: IUser}, { data: Partial<IUser> }>({
            query: ({ data }) => ({
                url: '/user',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserQuery, useUpdateUserMutation } = userApi;