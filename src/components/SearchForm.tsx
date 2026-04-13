import { Search } from 'lucide-react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setSearchKey, setSearchType } from '../store/filtersSlice'
import { type SearchType } from '../types/disney'
import { SegmentedControl } from './SegmentedControl'

export const SearchForm = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType } = useAppSelector((state) => state.filters)
    return (
        <form role="search" onSubmit={(e) => e.preventDefault()} className="px-4 py-3">
            <div className="flex gap-2 items-center">
                <SegmentedControl
                    ariaLabel="Search by"
                    value={searchType}
                    onChange={(type) => dispatch(setSearchType(type))}
                    options={[
                        { value: 'name' as SearchType, label: 'Name' },
                        { value: 'tvShows' as SearchType, label: 'TV Show' },
                    ]}
                />

                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => dispatch(setSearchKey(e.target.value))}
                        placeholder={searchType === 'tvShows' ? 'Search by TV show…' : 'Search by character name…'}
                        className="w-full pl-8 pr-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm placeholder-gray-400"
                        aria-label={searchType === 'tvShows' ? 'Search by TV show' : 'Search by character name'}
                    />
                </div>
            </div>
        </form>
    )
}
