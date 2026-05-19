import { CompanionType } from "@/types/companion";
import { baseApi } from "./baseApi";

const companionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSavedCards: builder.query<{saved_cards: { _id: string, query: string, type: CompanionType }[]}, void>({
            query: () => '/companion/bookmarks',
            providesTags: ['Companion']
        })
    })
})

export const { useGetSavedCardsQuery } = companionApi;