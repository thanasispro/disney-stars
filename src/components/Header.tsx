import { Wand2 } from 'lucide-react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { toggleTheme } from '../store/themeSlice'

export const Header = () => {
    const dispatch = useAppDispatch()
    const isDark = useAppSelector((state) => state.theme.theme) === 'dark'

    return (
        <header className="w-full px-6 py-4 flex items-center justify-between bg-linear-to-r from-blue-950 via-blue-900 to-indigo-900 border-b border-blue-800 shadow-lg">
            <div>
                <h1
                    style={{ fontFamily: "'Cinzel', serif" }}
                    className="text-2xl font-bold text-white tracking-widest leading-none"
                >
                    <span className="flex items-center gap-2">
                        <Wand2 className="w-6 h-6 text-amber-400 shrink-0" />
                        <span>Disney Stars</span>
                    </span>
                </h1>
                <p className="hidden sm:block text-sm text-blue-300 mt-0.5">Explore Disney characters</p>
            </div>

            <button
                onClick={() => dispatch(toggleTheme())}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors cursor-pointer ${isDark ? 'bg-amber-400' : 'bg-white/30'}`}
            >
                <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </header>
    )
}
