import { type ReactNode } from 'react'

type Option<T extends string> = {
    value: T
    label: ReactNode
    ariaLabel?: string
}

export const SegmentedControl = <T extends string>({
    options,
    value,
    onChange,
    disabled,
    ariaLabel,
}: {
    options: Option<T>[]
    value: T
    onChange: (value: T) => void
    disabled?: boolean
    ariaLabel?: string
}) => (
    <div role="group" aria-label={ariaLabel} className="flex rounded-lg border border-blue-200 dark:border-slate-600 overflow-hidden shrink-0 text-sm">
        {options.map((option) => (
            <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={value === option.value}
                aria-label={option.ariaLabel}
                disabled={disabled}
                className={`px-3 py-2 flex items-center gap-1.5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
                    value === option.value
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700'
                }`}
            >
                {option.label}
            </button>
        ))}
    </div>
)
