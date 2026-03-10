import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

// NOTE: This form sends data to the backend API at /feedback/create
// The backend should be configured to send emails to: johnny@jetjams.net
// Current backend API endpoint: ${getApiBaseUrl()}/feedback/create

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