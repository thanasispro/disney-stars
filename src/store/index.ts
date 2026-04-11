import { configureStore } from '@reduxjs/toolkit'
import { disneyAPI } from '../api/disneyApi'
import filtersReducer from './filtersSlice'
import themeReducer from './themeSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        theme: themeReducer,
        modal: modalReducer,
        [disneyAPI.reducerPath]: disneyAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(disneyAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
