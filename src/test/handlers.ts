import { http, HttpResponse } from 'msw'
import { mockCharacter, mockCharacters } from './mockData'

const BASE = 'https://api.disneyapi.dev'

export const handlers = [
    http.get(`${BASE}/character`, () =>
        HttpResponse.json({
            info: { count: 3, totalPages: 1, nextPage: null, previousPage: null },
            data: mockCharacters(3),
        })
    ),
]

// Returns a single object instead of array — the API quirk we handle in transformResponse
export const singleResultHandler = http.get(`${BASE}/character`, () =>
    HttpResponse.json({
        info: { count: 1, totalPages: 492, nextPage: null, previousPage: null },
        data: mockCharacter({ _id: 10104, name: 'Test Character', films: [], shortFilms: [] }),
    })
)
