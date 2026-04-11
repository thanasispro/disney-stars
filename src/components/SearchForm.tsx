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
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                aria-label="Search by"
            >
                <option value="name">Name</option>
                <option value="tvShows">TV Show</option>
            </select>

            <input
                type="text"
                value={searchKey}
                onChange={(e) => dispatch(setSearchKey(e.target.value))}
                placeholder={searchType === 'name' ? 'Search by character name…' : 'Search by TV show…'}
                className="flex-1 sm:w-64 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm placeholder-gray-400"
                aria-label="Search"
            />
        </div>
    )
}
