import { describe, it, expect } from 'vitest'
import { normalizeResponse } from '../api/disneyApi'
import { mockCharacter, mockCharacters } from '../test/mockData'

const info = { count: 3, totalPages: 1, nextPage: null, previousPage: null }

describe('normalizeResponse', () => {
    it('passes an array response through unchanged', () => {
        const characters = mockCharacters(3)
        const result = normalizeResponse({ info, data: characters })

        expect(Array.isArray(result.data)).toBe(true)
        expect(result.data).toHaveLength(3)
        expect(result.data).toEqual(characters)
    })

    it('wraps a single-object response in an array', () => {
        const character = mockCharacter({ _id: 10104, name: 'Test Character' })
        const result = normalizeResponse({ info, data: character })

        expect(Array.isArray(result.data)).toBe(true)
        expect(result.data).toHaveLength(1)
        expect(result.data[0]).toEqual(character)
    })

    it('preserves the info field', () => {
        const result = normalizeResponse({ info, data: [] })
        expect(result.info).toEqual(info)
    })
})
