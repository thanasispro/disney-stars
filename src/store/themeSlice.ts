import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeState {
    theme: 'light' | 'dark'
}

const initialState: ThemeState = {
    theme: getInitialTheme(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', state.theme)
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
