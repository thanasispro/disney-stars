import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterQueryParams, DisneyApiResponse } from "../types/disney";


export const disneyAPI = createApi({
    reducerPath: "disneyAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.disneyapi.dev"}),
    endpoints: (builder) => ({
        getCharacters: builder.query<DisneyApiResponse, CharacterQueryParams>({
            query: ({ page, pageSize, searchKey }) => ({
                url: '/character',
                params: {
                    page,
                    pageSize,
                    ...(searchKey && { name: searchKey, films: searchKey }),
                },
            }),
        })
    })
})

export const { useGetCharactersQuery } = disneyAPI