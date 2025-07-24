import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/feedback/`

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