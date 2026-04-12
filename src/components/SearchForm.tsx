import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setSearchKey, setSearchType } from '../store/filtersSlice'
import { type SearchType } from '../types/disney'

export const SearchForm = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType } = useAppSelector((state) => state.filters)

    return (
        <div className="flex w-full sm:w-auto gap-2 px-4 py-3">
            <select
                value={searchType}
                onChange={(e) => dispatch(setSearchType(e.target.value as SearchType))}
                className="px-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                aria-label="Search by"
            >
                <option value="name">Name</option>
                <option value="tvShows">TV Show</option>
            </select>

            <div className="relative flex-1 sm:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
                <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => dispatch(setSearchKey(e.target.value))}
                    placeholder={searchType === 'name' ? 'Search by character name…' : 'Search by TV show…'}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm placeholder-gray-400"
                    aria-label="Search"
                />
            </div>
        </div>
    )
}
