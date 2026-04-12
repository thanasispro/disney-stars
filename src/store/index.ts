import { configureStore } from '@reduxjs/toolkit'
import { disneyAPI } from '../api/disneyApi'
import filtersReducer from './filtersSlice'
import themeReducer from './themeSlice'
import modalReducer from './modalSlice'
import { urlSyncMiddleware } from './urlSyncMiddleware'

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        theme: themeReducer,
        modal: modalReducer,
        [disneyAPI.reducerPath]: disneyAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(disneyAPI.middleware, urlSyncMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
