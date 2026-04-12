import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'

describe('useDebounce', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('returns the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 400))
        expect(result.current).toBe('hello')
    })

    it('does not update before the delay elapses', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
            initialProps: { value: 'hello' },
        })

        rerender({ value: 'world' })
        act(() => vi.advanceTimersByTime(200))

        expect(result.current).toBe('hello')
    })

    it('updates after the delay elapses', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
            initialProps: { value: 'hello' },
        })

        rerender({ value: 'world' })
        act(() => vi.advanceTimersByTime(400))

        expect(result.current).toBe('world')
    })

    it('resets the timer when value changes rapidly', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 400), {
            initialProps: { value: 'a' },
        })

        rerender({ value: 'ab' })
        act(() => vi.advanceTimersByTime(200))
        rerender({ value: 'abc' })
        act(() => vi.advanceTimersByTime(200))

        // Still on the original value — neither intermediate update landed
        expect(result.current).toBe('a')

        act(() => vi.advanceTimersByTime(200))
        expect(result.current).toBe('abc')
    })
})
