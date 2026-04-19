import { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { type DisneyCharacter, type SortDirection, type SortKey } from '../types/disney'
import { ChipList } from './ChipList'

const popularityStars = (score: number): number => {
    if (score > 20) return 5
    if (score > 15) return 4
    if (score > 10) return 3
    if (score > 5) return 2
    if (score > 0) return 1
    return 0
}

const StarRating = ({ score }: { score: number }) => {
    const stars = popularityStars(score)
    if (stars === 0) return null
    return (
        <span className="flex items-center gap-0.5 ml-1.5" aria-label={`Popularity: ${stars} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    aria-hidden="true"
                    className={`w-3 h-3 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-600 fill-current'}`}
                />
            ))}
        </span>
    )
}

const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="px-4 py-3">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </td>
        {Array.from({ length: 2 }).map((_, i) => (
            <td key={i} className="px-4 py-3">
                <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
            </td>
        ))}
        {Array.from({ length: 2 }).map((_, i) => (
            <td key={i + 2} className="px-4 py-3">
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            </td>
        ))}
    </tr>
)

export const CharacterTable = ({
    characters,
    isLoading,
    sortKey,
    sortDirection,
    onSort,
    onRowClick,
}: {
    characters: DisneyCharacter[]
    isLoading: boolean
    sortKey: SortKey
    sortDirection: SortDirection
    onSort: (key: SortKey) => void
    onRowClick: (character: DisneyCharacter) => void
}) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 })
    }, [characters])

    return (
        <div ref={scrollRef} className="overflow-x-auto overflow-y-auto min-h-96 max-h-150 rounded-lg border border-blue-100 dark:border-slate-700">
            <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-slate-300 uppercase text-xs">
                    <tr>
                        {(['name', 'tvShows', 'videoGames'] as SortKey[]).map((key) => {
                            const label = key === 'name' ? 'Character' : key === 'tvShows' ? '# TV' : '# Games'
                            const title = key === 'tvShows' ? 'TV Shows' : key === 'videoGames' ? 'Video Games' : undefined
                            const isActive = sortKey === key
                            return (
                                <th
                                    key={key}
                                    title={title}
                                    className="px-4 py-3 cursor-pointer select-none hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                                    onClick={() => onSort(key)}
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSort(key)}
                                    tabIndex={0}
                                    aria-sort={isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                                >
                                    {label} {isActive ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                                </th>
                            )
                        })}
                        <th className="px-4 py-3">Allies</th>
                        <th className="px-4 py-3">Enemies</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} />)
                        : !characters.length
                        ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                                    No characters found
                                </td>
                            </tr>
                        )
                        : characters.map((character, index) => (
                            <tr
                                key={character._id}
                                onClick={() => onRowClick(character)}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onRowClick(character)}
                                tabIndex={0}
                                role="button"
                                aria-label={`View details for ${character.name}`}
                                className={`cursor-pointer hover:bg-indigo-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400 ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-blue-50/40 dark:bg-slate-800/40'}`}
                            >
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                    <span className="flex items-center">
                                        {character.name}
                                        <StarRating score={character.tvShows.length + character.videoGames.length + character.films.length + character.shortFilms.length + character.parkAttractions.length} />
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                    {character.tvShows.length}
                                </td>
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                    {character.videoGames.length}
                                </td>
                                <td className="px-4 py-3">
                                    <ChipList items={character.allies} maxVisible={3} maxChars={20} />
                                </td>
                                <td className="px-4 py-3">
                                    <ChipList items={character.enemies} maxVisible={3} maxChars={20} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
