import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

const baseUrl = `${getApiBaseUrl()}/general/`

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