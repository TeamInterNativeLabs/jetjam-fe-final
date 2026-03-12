import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

// IMPORTANT: Backend Configuration Required
// The backend API endpoint /feedback/create should be configured to:
// 1. Receive form submissions from this contact form
// 2. Send email notifications to: johnny@jetjams.net
// 3. Include all form fields: name, email, subject, message
// 
// Form data structure:
// {
//   name: string,
//   email: string, 
//   subject: string,
//   message: string
// }

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