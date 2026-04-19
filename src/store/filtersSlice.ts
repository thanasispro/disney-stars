import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type SortDirection, type SearchType } from '../types/disney'

interface FiltersState {
    searchKey: string
    searchType: SearchType
    page: number
    pageSize: number
    sortDirection: SortDirection
}

const params = new URLSearchParams(window.location.search)

const initialState: FiltersState = {
    searchKey: params.get('q') ?? '',
    searchType: (params.get('type') as SearchType) ?? 'name',
    page: Number(params.get('page')) || 1,
    pageSize: Number(params.get('pageSize')) || 50,
    sortDirection: (params.get('sort') as SortDirection) ?? 'asc',
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
