import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortDirection } from '../types/disney'

interface FiltersState {
    searchKey: string
    page: number
    pageSize: number
    sortDirection: SortDirection
}

const initialState: FiltersState = {
    searchKey: '',
    page: 1,
    pageSize: 50,
    sortDirection: 'asc',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload
            state.page = 1
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload
            state.page = 1
        },
        toggleSort: (state) => {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc'
        },
    },
})

export const { setSearchKey, setPage, setPageSize, toggleSort } = filtersSlice.actions
export default filtersSlice.reducer
