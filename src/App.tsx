import { useEffect, useMemo } from 'react'
import { useGetCharactersQuery } from './api/disneyApi'
import { useAppSelector } from './hooks/useAppSelector'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useDebounce } from './hooks/useDebounce'
import { toggleSort } from './store/filtersSlice'
import { openModal, closeModal } from './store/modalSlice'
import { Header } from './components/Header'
import { SearchForm } from './components/SearchForm'
import { CharacterTable } from './components/CharacterTable'
import { Pagination } from './components/Pagination'
import { MoviesPieChart } from './components/MoviesPieChart'
import { CharacterModal } from './components/CharacterModal'
import { type DisneyCharacter } from './types/disney'

export const App = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType, page, pageSize, sortDirection } = useAppSelector((s) => s.filters)
    const { selectedCharacter, isModalOpen } = useAppSelector((s) => s.modal)
    const theme = useAppSelector((s) => s.theme.theme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    const debouncedSearch = useDebounce(searchKey, 400)

    const { data, isLoading, isError } = useGetCharactersQuery({
        page,
        pageSize,
        searchKey: debouncedSearch || undefined,
        searchType,
    })

    const sorted = useMemo(() => {
        if (!data?.data) return []
        return [...data.data].sort((a, b) =>
            sortDirection === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        )
    }, [data, sortDirection])

    if (isError) return (
        <div className="min-h-screen bg-blue-50 dark:bg-slate-950">
            <Header />
            <div className="flex items-center justify-center h-[calc(100vh-65px)]">
                <div className="text-center space-y-3">
                    <p className="text-4xl">⚠️</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Failed to load characters</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Check your connection and try refreshing the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-blue-50 dark:bg-slate-950">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-700 shadow-md">
                        <SearchForm />
                        <CharacterTable
                            characters={sorted}
                            isLoading={isLoading}
                            sortDirection={sortDirection}
                            onSort={() => dispatch(toggleSort())}
                            onRowClick={(c: DisneyCharacter) => dispatch(openModal(c))}
                        />
                        <Pagination
                            totalPages={data?.info.totalPages}
                            isLoading={isLoading}
                            isSearching={!!debouncedSearch}
                        />
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-slate-700 shadow-md p-6">
                        <h2 className="text-lg font-semibold text-blue-950 dark:text-white mb-4 tracking-wide">🎬 Films per Character</h2>
                        <MoviesPieChart characters={sorted} isLoading={isLoading} />
                    </div>
                </div>
            </main>

            {isModalOpen && selectedCharacter && (
                <CharacterModal character={selectedCharacter} onClose={() => dispatch(closeModal())} />
            )}
        </div>
    )
}
