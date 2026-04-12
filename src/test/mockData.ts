import { type DisneyCharacter } from '../types/disney'

export const mockCharacter = (overrides: Partial<DisneyCharacter> = {}): DisneyCharacter => ({
    _id: 1,
    name: 'Mickey Mouse',
    imageUrl: 'https://example.com/mickey.jpg',
    films: ['Fantasia', 'Brave Little Tailor'],
    shortFilms: ['Steamboat Willie'],
    tvShows: ['Mickey Mouse Clubhouse'],
    videoGames: ['Kingdom Hearts'],
    parkAttractions: [],
    allies: ['Minnie Mouse', 'Donald Duck'],
    enemies: ['Pete'],
    ...overrides,
})

export const mockCharacters = (count: number): DisneyCharacter[] =>
    Array.from({ length: count }, (_, i) =>
        mockCharacter({ _id: i + 1, name: `Character ${i + 1}` })
    )
