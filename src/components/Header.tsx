import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { toggleTheme } from '../store/themeSlice'

export const Header = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme.theme)
    const isDark = theme === 'dark'

    return (
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">✨ Disney Stars</h1>
                <p className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">Explore Disney characters</p>
            </div>

            <button
                onClick={() => dispatch(toggleTheme())}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors cursor-pointer bg-gray-300 dark:bg-blue-600"
            >
                <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </header>
    )
}
