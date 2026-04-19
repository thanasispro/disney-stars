import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CharacterTable } from '../components/CharacterTable'
import { mockCharacters } from '../test/mockData'

const defaultProps = {
    characters: [],
    isLoading: false,
    sortKey: 'name' as const,
    sortDirection: 'asc' as const,
    onSort: vi.fn(),
    onRowClick: vi.fn(),
}

describe('CharacterTable', () => {
    afterEach(() => cleanup())
    it('shows skeleton rows while loading', () => {
        const { container } = render(<CharacterTable {...defaultProps} isLoading />)
        const skeletons = container.querySelectorAll('.animate-pulse')
        expect(skeletons.length).toBe(10)
    })

    it('shows empty state when no characters', () => {
        render(<CharacterTable {...defaultProps} />)
        expect(screen.getByText('No characters found')).toBeInTheDocument()
    })

    it('renders a row for each character', () => {
        const characters = mockCharacters(5)
        render(<CharacterTable {...defaultProps} characters={characters} />)
        characters.forEach((c) => {
            expect(screen.getByText(c.name)).toBeInTheDocument()
        })
    })

    it('calls onRowClick with the correct character when a row is clicked', async () => {
        const user = userEvent.setup()
        const characters = mockCharacters(3)
        const onRowClick = vi.fn()

        render(<CharacterTable {...defaultProps} characters={characters} onRowClick={onRowClick} />)

        await user.click(screen.getByText(characters[1].name))
        expect(onRowClick).toHaveBeenCalledWith(characters[1])
    })

    it('calls onSort when the Character header is clicked', async () => {
        const user = userEvent.setup()
        const onSort = vi.fn()

        render(<CharacterTable {...defaultProps} onSort={onSort} />)

        await user.click(screen.getByRole('columnheader', { name: /character/i }))
        expect(onSort).toHaveBeenCalledWith('name')
    })

    it('displays correct tv show and video game counts', () => {
        const characters = [mockCharacters(1)[0]]
        render(<CharacterTable {...defaultProps} characters={characters} />)

        // tvShows: ['Mickey Mouse Clubhouse'] → 1, videoGames: ['Kingdom Hearts'] → 1
        const cells = screen.getAllByRole('cell')
        const tvShowsCell = cells.find((c) => c.textContent === '1')
        expect(tvShowsCell).toBeInTheDocument()
    })
})
