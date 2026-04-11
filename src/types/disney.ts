export interface DisneyCharacter {
    _id: number
    name: string
    imageUrl: string
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
    currentPage: number
    nextPage: string | null
    prevPage: string | null
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
