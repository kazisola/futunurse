import { CompanionCard, CompanionType } from "@/types/companion";
import { baseApi } from "./baseApi";

const companionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSavedCards: builder.query<{ saved_cards: { _id: string, query: string, type: CompanionType }[] }, void>({
            query: () => '/companion/bookmarks',
            providesTags: ['Companion']
        }),
        getSavedCard: builder.query<{ card: { card: CompanionCard } }, { id: string }>({
            query: ({ id }) => `/companion/bookmarks/${id}`,
            providesTags: ['Companion']
        }),
        saveCard: builder.mutation<void, { query: string, type: CompanionType, card: CompanionCard }>({
            query: ({ query, type, card }) => ({
                url: '/companion/bookmarks',
                method: 'POST',
                body: { query, type, card }
            }),
            invalidatesTags: ['Companion']
        })
    })
})

export const { useGetSavedCardsQuery, useGetSavedCardQuery, useLazyGetSavedCardQuery, useSaveCardMutation } = companionApi;