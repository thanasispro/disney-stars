const Chip = ({ label, maxChars, onClick }: { label: string; maxChars?: number; onClick?: (label: string) => void }) => {
    const isTruncated = !!maxChars && label.length > maxChars
    const truncated = isTruncated ? label.slice(0, maxChars) + '…' : label
    const isClickable = !!onClick

    return (
        <span className="relative group inline-block">
            <span
                aria-label={label}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onClick={() => onClick?.(label)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(label)}
                className={`inline-block px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200 ${isClickable ? 'cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors underline underline-offset-2 decoration-indigo-400' : 'cursor-default'}`}
            >
                {truncated}
            </span>
            {isTruncated && (
                <span className="absolute top-full left-0 mt-1 px-2 py-1 rounded text-xs text-white bg-gray-800 dark:bg-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {label}
                </span>
            )}
        </span>
    )
}

export const ChipList = ({
    items,
    maxVisible,
    maxChars,
    onItemClick,
}: {
    items: string[]
    maxVisible?: number
    maxChars?: number
    onItemClick?: (item: string) => void
}) => {
    if (!items.length) return <span className="text-gray-400 text-xs">—</span>

    const visible = maxVisible ? items.slice(0, maxVisible) : items
    const remaining = maxVisible ? items.length - maxVisible : 0

    return (
        <div className="flex flex-wrap gap-1">
            {visible.map((item, i) => (
                <Chip key={`${item}-${i}`} label={item} maxChars={maxChars} onClick={onItemClick} />
            ))}
            {remaining > 0 && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    +{remaining} more
                </span>
            )}
        </div>
    )
}
