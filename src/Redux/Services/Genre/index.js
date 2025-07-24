import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/genre/`

export const genreApiService = createApi({
    reducerPath: 'genreApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getGenreStats: builder.query({
            query: () => `stats`,
            keepUnusedDataFor: 0
        })
    })
})

export const {
    useGetGenreStatsQuery
} = genreApiService