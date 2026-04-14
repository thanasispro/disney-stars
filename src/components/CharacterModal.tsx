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
                <div className="px-6 py-5 space-y-6">
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
                </div>
            </div>
        </div>
    )
}
