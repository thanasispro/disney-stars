import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharacterQueryParams, DisneyApiResponse } from "../types/disney";


export const disneyAPI = createApi({
    reducerPath: "disneyAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://api.disneyapi.dev"}),
    endpoints: (builder) => ({
        getCharacters: builder.query<DisneyApiResponse, CharacterQueryParams>({
            query: ({ page, pageSize, name, films }) => ({
                url: '/character',
                params: {
                    page,
                    pageSize,
                    ...(name && { name }),
                    ...(films && { films }),
                },
            }),
        })
    })
})

export const { useGetCharactersQuery } = disneyAPI