import { useEffect, useRef } from 'react'
import { type DisneyCharacter, type SortDirection } from '../types/disney'
import { ChipList } from './ChipList'

const SkeletonRow = ({ index }: { index: number }) => (
    <tr className="animate-pulse">
        <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{index}</td>
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
    sortDirection,
    onSort,
    onRowClick,
}: {
    characters: DisneyCharacter[]
    isLoading: boolean
    sortDirection: SortDirection
    onSort: () => void
    onRowClick: (character: DisneyCharacter) => void
}) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 })
    }, [characters])

    return (
        <div ref={scrollRef} className="overflow-x-auto overflow-y-auto max-h-150 rounded-lg border border-blue-100 dark:border-slate-700">
            <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-10 bg-blue-50 dark:bg-slate-800 text-blue-900 dark:text-slate-300 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 w-12">#</th>
                        <th
                            className="px-4 py-3 cursor-pointer select-none hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={onSort}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSort()}
                            tabIndex={0}
                            aria-sort={sortDirection === 'asc' ? 'ascending' : 'descending'}
                        >
                            Character {sortDirection === 'asc' ? '↑' : '↓'}
                        </th>
                        <th className="px-4 py-3">TV Shows</th>
                        <th className="px-4 py-3">Video Games</th>
                        <th className="px-4 py-3">Allies</th>
                        <th className="px-4 py-3">Enemies</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {isLoading
                        ? Array.from({ length: 10 }).map((_, i) => <SkeletonRow key={i} index={i + 1} />)
                        : !characters.length
                        ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
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
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{index + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                    {character.name}
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
