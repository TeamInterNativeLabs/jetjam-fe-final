import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/general/`

export const generalApiService = createApi({
    reducerPath: 'generalApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getData: builder.query({
            query: () => `get`,
            keepUnusedDataFor: 0
        })
    })
})

export const {
    useGetDataQuery,
} = generalApiService