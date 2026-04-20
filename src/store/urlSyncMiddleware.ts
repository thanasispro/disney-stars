import { Middleware } from '@reduxjs/toolkit'

export const urlSyncMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action)

    if (typeof action === 'object' && action !== null && 'type' in action &&
        String(action.type).startsWith('filters/')) {
        const { filters } = store.getState()
        const params = new URLSearchParams()

        // we can export filters in a centralize way if we want to avoid coupling this middleware with the filters slice
        if (filters.searchKey) params.set('q', filters.searchKey)
        if (filters.searchType !== 'name') params.set('type', filters.searchType)
        if (filters.page > 1) params.set('page', String(filters.page))
        if (filters.pageSize !== 50) params.set('pageSize', String(filters.pageSize))
        if (filters.sortDirection !== 'asc') params.set('sort', filters.sortDirection)

        const search = params.toString()
        window.history.replaceState(null, '', search ? `?${search}` : window.location.pathname)
    }

    return result
}
