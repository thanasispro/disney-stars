const Chip = ({ label, maxChars }: { label: string; maxChars?: number }) => {
    const isTruncated = !!maxChars && label.length > maxChars
    const truncated = isTruncated ? label.slice(0, maxChars) + '…' : label

    return (
        <span className="relative group inline-block">
            <span
                aria-label={label}
                className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-default"
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
}: {
    items: string[]
    maxVisible?: number
    maxChars?: number
}) => {
    if (!items.length) return <span className="text-gray-400 text-xs">—</span>

    const visible = maxVisible ? items.slice(0, maxVisible) : items
    const remaining = maxVisible ? items.length - maxVisible : 0

    return (
        <div className="flex flex-wrap gap-1">
            {visible.map((item) => (
                <Chip key={item} label={item} maxChars={maxChars} />
            ))}
            {remaining > 0 && (
                <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    +{remaining} more
                </span>
            )}
        </div>
    )
}
