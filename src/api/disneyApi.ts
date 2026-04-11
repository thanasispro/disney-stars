import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type CharacterQueryParams, type DisneyApiResponse } from "../types/disney";

export const disneyAPI = createApi({
    reducerPath: "disneyAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev" }),
    endpoints: (builder) => ({
        getCharacters: builder.query<DisneyApiResponse, CharacterQueryParams>({
            query: ({ page, pageSize, searchKey, searchType }) => ({
                url: '/character',
                params: {
                    page,
                    pageSize,
                    ...(searchKey && searchType === 'name' && { name: searchKey }),
                    ...(searchKey && searchType === 'tvShows' && { tvShows: searchKey }),
                },
            }),
        })
    })
})

export const { useGetCharactersQuery } = disneyAPI
