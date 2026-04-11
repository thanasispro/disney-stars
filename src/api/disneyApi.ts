import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type CharacterQueryParams, type DisneyCharacter, type DisneyApiInfo, type DisneyApiResponse } from "../types/disney";

type RawApiResponse = {
    info: DisneyApiInfo
    data: DisneyCharacter | DisneyCharacter[]
}

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
            transformResponse: (response: RawApiResponse): DisneyApiResponse => ({
                info: response.info,
                data: Array.isArray(response.data) ? response.data : [response.data],
            }),
        })
    })
})

export const { useGetCharactersQuery } = disneyAPI
