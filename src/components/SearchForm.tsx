import { useState } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setSearchKey, setSearchType, addTvShowFilter, removeTvShowFilter } from '../store/filtersSlice'
import { type SearchType } from '../types/disney'

export const SearchForm = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType, tvShowFilters } = useAppSelector((state) => state.filters)
    const [tvInput, setTvInput] = useState('')

    const handleTvKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tvInput.trim()) {
            dispatch(addTvShowFilter(tvInput.trim()))
            setTvInput('')
        }
    }

    return (
        <div className="px-4 py-3 space-y-2">
            <div className="flex gap-2 items-center">
                <select
                    value={searchType}
                    onChange={(e) => { setTvInput(''); dispatch(setSearchType(e.target.value as SearchType)) }}
                    className="px-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm shrink-0"
                    aria-label="Search by"
                >
                    <option value="name">Name</option>
                    <option value="tvShows">TV Show</option>
                </select>

                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
                    {searchType === 'tvShows' ? (
                        <input
                            type="text"
                            value={tvInput}
                            onChange={(e) => setTvInput(e.target.value)}
                            onKeyDown={handleTvKeyDown}
                            placeholder="Type a TV show and press Enter…"
                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm placeholder-gray-400"
                            aria-label="Search by TV show"
                        />
                    ) : (
                        <input
                            type="text"
                            value={searchKey}
                            onChange={(e) => dispatch(setSearchKey(e.target.value))}
                            placeholder="Search by character name…"
                            className="w-full pl-8 pr-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm placeholder-gray-400"
                            aria-label="Search"
                        />
                    )}
                </div>
            </div>

            {searchType === 'tvShows' && tvShowFilters.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {tvShowFilters.map((show) => (
                        <span
                            key={show}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200"
                        >
                            {show}
                            <button
                                onClick={() => dispatch(removeTvShowFilter(show))}
                                className="hover:text-red-500 transition-colors leading-none cursor-pointer"
                                aria-label={`Remove ${show} filter`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
