import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setSearchKey, setSearchType } from '../store/filtersSlice'
import { type SearchType } from '../types/disney'

export const SearchForm = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType } = useAppSelector((state) => state.filters)
    return (
        <form role="search" onSubmit={(e) => e.preventDefault()} className="px-4 py-3">
            <div className="flex gap-2 items-center">
                <div role="group" aria-label="Search by" className="flex rounded-lg border border-blue-200 dark:border-slate-600 overflow-hidden shrink-0 text-sm">
                    {(['name', 'tvShows'] as SearchType[]).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => dispatch(setSearchType(type))}
                            aria-pressed={searchType === type}
                            className={`px-3 py-2 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
                                searchType === type
                                    ? 'bg-blue-600 text-white font-medium'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                            }`}
                        >
                            {type === 'name' ? 'Name' : 'TV Show'}
                        </button>
                    ))}
                </div>

                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">🔍</span>
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
