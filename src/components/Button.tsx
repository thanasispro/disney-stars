import { type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold'

export const Button = ({
    children,
    onClick,
    disabled,
    variant = 'secondary',
    ariaLabel,
    className = '',
}: {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: ButtonVariant
    ariaLabel?: string
    className?: string
}) => {
    const base = 'px-3 py-1.5 rounded-lg text-sm transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
        ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
        gold: 'bg-amber-400 text-blue-950 font-semibold hover:bg-amber-300',
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}
