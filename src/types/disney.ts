export interface DisneyCharacter {
    _id: number
    name: string
    imageUrl: string
    url?: string
    films: string[]
    shortFilms: string[]
    tvShows: string[]
    videoGames: string[]
    parkAttractions: string[]
    allies: string[]
    enemies: string[]
}

export interface DisneyApiInfo {
    count: number
    totalPages: number
    nextPage: string | null
    previousPage: string | null
}

export interface DisneyApiResponse {
    info: DisneyApiInfo
    data: DisneyCharacter[]
}

export type SearchType = 'name' | 'tvShows'

export interface CharacterQueryParams {
    page: number
    pageSize: number
    searchKey?: string
    searchType?: SearchType
}

export type SortDirection = 'asc' | 'desc'
export type SortKey = 'name' | 'tvShows' | 'videoGames'
