import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

const baseUrl = `${getApiBaseUrl()}/feedback/`

export const feedbackApiService = createApi({
    reducerPath: 'feedbackApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        createFeedback: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useCreateFeedbackMutation,
} = feedbackApiService