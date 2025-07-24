import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/package/`

export const packageApiService = createApi({
    reducerPath: 'packageApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: (data) => ({
                url: data?.id ? `get/${data?.id}` : `get`,
                method: "GET",
                params: data
            }),
            keepUnusedDataFor: 0
        }),
        subscribe: builder.mutation({
            query: (id) => ({
                url: `subscribe/${id}`,
                method: 'POST'
            })
        }),
    })
})

export const {
    useGetPackagesQuery,
    useSubscribeMutation
} = packageApiService