import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChipList } from '../components/ChipList'

describe('ChipList', () => {
    afterEach(() => cleanup())

    it('renders all items', () => {
        render(<ChipList items={['Mickey', 'Donald', 'Goofy']} />)
        expect(screen.getByText('Mickey')).toBeInTheDocument()
        expect(screen.getByText('Donald')).toBeInTheDocument()
        expect(screen.getByText('Goofy')).toBeInTheDocument()
    })

    it('renders a dash when items is empty', () => {
        render(<ChipList items={[]} />)
        expect(screen.getByText('—')).toBeInTheDocument()
    })

    it('truncates label when it exceeds maxChars', () => {
        render(<ChipList items={['A very long name']} maxChars={5} />)
        expect(screen.getByText('A ver…')).toBeInTheDocument()
    })

    it('preserves full label in aria-label when truncated', () => {
        render(<ChipList items={['A very long name']} maxChars={5} />)
        expect(screen.getByLabelText('A very long name')).toBeInTheDocument()
    })

    it('does not truncate when label is within maxChars', () => {
        render(<ChipList items={['Hi']} maxChars={5} />)
        expect(screen.getByText('Hi')).toBeInTheDocument()
    })

    it('shows +N more badge when items exceed maxVisible', () => {
        render(<ChipList items={['A', 'B', 'C', 'D', 'E']} maxVisible={3} />)
        expect(screen.getByText('+2 more')).toBeInTheDocument()
        expect(screen.queryByText('D')).not.toBeInTheDocument()
    })

    it('calls onItemClick with the correct label when clicked', async () => {
        const user = userEvent.setup()
        const onItemClick = vi.fn()
        render(<ChipList items={['Mickey']} onItemClick={onItemClick} />)
        await user.click(screen.getByText('Mickey'))
        expect(onItemClick).toHaveBeenCalledWith('Mickey')
    })
})
