import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { setPage, setPageSize } from '../store/filtersSlice'
import { Button } from './Button'

const getPageNumbers = (current: number, total: number): (number | '…')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
    if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
    return [1, '…', current - 1, current, current + 1, '…', total]
}

export const Pagination = ({
    totalPages,
    isLoading,
}: {
    totalPages?: number
    isLoading: boolean
}) => {
    const dispatch = useAppDispatch()
    const { page, pageSize } = useAppSelector((state) => state.filters)

    const pages = totalPages ? getPageNumbers(page, totalPages) : []

    return (
        <nav aria-label="Pagination" className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Show</span>
                <select
                    value={pageSize}
                    onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                    disabled={isLoading}
                    className="px-3 py-1.5 rounded-lg border border-blue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm disabled:opacity-50"
                    aria-label="Results per page"
                >
                    {[10, 20, 50, 100, 200, 500].map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
                <span className="text-sm text-gray-500 dark:text-gray-400">per page</span>
            </div>

            {totalPages && (
                <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap" aria-live="polite">
                    Page {page} of {totalPages}
                </span>
            )}

            {totalPages && totalPages > 1 && (
                <div className="flex items-center gap-1">
                    <Button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1 || isLoading} ariaLabel="Previous page">
                        ← Prev
                    </Button>

                    <div className="hidden sm:flex items-center gap-1">
                        {pages.map((p, i) =>
                            p === '…' ? (
                                <span key={`ellipsis-${i}`} aria-hidden="true" className="w-8 h-8 flex items-center justify-center text-gray-400">…</span>
                            ) : (
                                <Button
                                    key={p}
                                    onClick={() => dispatch(setPage(p as number))}
                                    disabled={isLoading}
                                    variant={p === page ? 'gold' : 'ghost'}
                                    ariaLabel={p === page ? `Page ${p}, current` : `Go to page ${p}`}
                                    ariaCurrent={p === page}
                                    className="w-8 h-8 px-0! py-0! flex items-center justify-center"
                                >
                                    {p}
                                </Button>
                            )
                        )}
                    </div>

                    <Button onClick={() => dispatch(setPage(page + 1))} disabled={page === totalPages || isLoading} ariaLabel="Next page">
                        Next →
                    </Button>
                </div>
            )}
        </nav>
    )
}
