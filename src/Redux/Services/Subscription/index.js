import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/subscription/`

export const subscriptionApiService = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getSubscriptions: builder.query({
            query: () => `get`
        })
    })
})

export const {
    useGetSubscriptionsQuery,
} = subscriptionApiService