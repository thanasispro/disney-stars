import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
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
import './index.css'

const App = () => {
    const dispatch = useAppDispatch()
    const { searchKey, searchType, page, pageSize, sortDirection } = useAppSelector((s) => s.filters)
    const { selectedCharacter, isModalOpen } = useAppSelector((s) => s.modal)

    const debouncedSearch = useDebounce(searchKey, 400)

    const { data, isLoading } = useGetCharactersQuery({
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
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

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎬 Films per Character</h2>
                        <MoviesPieChart characters={sorted} />
                    </div>
                </div>
            </main>

            {isModalOpen && selectedCharacter && (
                <CharacterModal character={selectedCharacter} onClose={() => dispatch(closeModal())} />
            )}
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)
