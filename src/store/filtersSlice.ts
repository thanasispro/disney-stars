import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type SortDirection, type SearchType } from '../types/disney'

interface FiltersState {
    searchKey: string
    searchType: SearchType
    page: number
    pageSize: number
    sortDirection: SortDirection
}

const initialState: FiltersState = {
    searchKey: '',
    searchType: 'name',
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
        setSearchType: (state, action: PayloadAction<SearchType>) => {
            state.searchType = action.payload
            state.searchKey = ''
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

export const { setSearchKey, setSearchType, setPage, setPageSize, toggleSort } = filtersSlice.actions
export default filtersSlice.reducer
