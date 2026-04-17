import { useEffect, useRef } from 'react'
import { type DisneyCharacter } from '../types/disney'
import { ChipList } from './ChipList'
import { Button } from './Button'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { setSearchKey, setSearchType } from '../store/filtersSlice'

export const CharacterModal = ({
    character,
    onClose,
}: {
    character: DisneyCharacter
    onClose: () => void
}) => {
    const dispatch = useAppDispatch()
    const modalRef = useRef<HTMLDivElement>(null)

    const handleTvShowClick = (show: string) => {
        dispatch(setSearchType('tvShows'))
        dispatch(setSearchKey(show))
        onClose()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Lock body scroll + focus modal on open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        modalRef.current?.focus()
        return () => { document.body.style.overflow = '' }
    }, [])

    // Close on ESC
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-label={`Details for ${character.name}`}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
                className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl outline-none shadow-2xl animate-slide-up border border-blue-100 dark:border-slate-700"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-blue-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        {character.imageUrl && (
                            <img
                                src={character.imageUrl}
                                alt={character.name}
                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                                className="w-16 h-16 rounded-full object-cover bg-gray-100 dark:bg-gray-800"
                            />
                        )}
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{character.name}</h2>
                    </div>
                    <Button onClick={onClose} variant="ghost" ariaLabel="Close modal">✕</Button>
                </div>

                {/* Body */}
                {character.tvShows.length === 0 && character.videoGames.length === 0 && character.films.length === 0 && character.shortFilms.length === 0 && character.parkAttractions.length === 0
                    ? <p className="px-6 py-10 text-sm text-gray-400 dark:text-gray-500 text-center">No data available for this character.</p>
                    : <div className="px-6 py-5 space-y-6">
                    <section>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                            TV Shows ({character.tvShows.length})
                        </h3>
                        <ChipList items={character.tvShows} onItemClick={handleTvShowClick} />
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                            Video Games ({character.videoGames.length})
                        </h3>
                        <ChipList items={character.videoGames} />
                    </section>

                    {(character.films.length > 0 || character.shortFilms.length > 0 || character.parkAttractions.length > 0) && (
                        <details className="group">
                            <summary className="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 list-none flex items-center gap-1 select-none">
                                <span className="transition-transform group-open:rotate-90">▶</span>
                                See more
                            </summary>
                            <div className="mt-4 space-y-6">
                                {character.films.length > 0 && (
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                                            Films ({character.films.length})
                                        </h3>
                                        <ChipList items={character.films} />
                                    </section>
                                )}
                                {character.shortFilms.length > 0 && (
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                                            Short Films ({character.shortFilms.length})
                                        </h3>
                                        <ChipList items={character.shortFilms} />
                                    </section>
                                )}
                                {character.parkAttractions.length > 0 && (
                                    <section>
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                                            Park Attractions ({character.parkAttractions.length})
                                        </h3>
                                        <ChipList items={character.parkAttractions} />
                                    </section>
                                )}
                            </div>
                        </details>
                    )}
                    </div>}
            </div>
        </div>
    )
}
