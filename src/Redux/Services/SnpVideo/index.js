import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

const baseUrl = `${getApiBaseUrl()}/snp-video/`

export const snpvideoApiService = createApi({
    reducerPath: 'snpvideoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getSnpVideos: builder.query({
            query: (data) => ({
                url: data?.id ? `get/${data?.id}` : `get`,
                params: data?.id ? {} : data
            }),
            keepUnusedDataFor: 0
        })
    })
})

export const {
    useGetSnpVideosQuery,
} = snpvideoApiService