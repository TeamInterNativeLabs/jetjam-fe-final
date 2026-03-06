import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

const baseUrl = `${getApiBaseUrl()}/subscription/`

// Subscription API (aligned with backend):
// - GET  /subscription/get   -> { data: [{ _id, active, createdAt, expiry, package: { title, price }, method_subscription_id?, canceledAt? }] }
// - POST /subscription/cancel -> body: { subscriptionId: "<id>" } or { id: "<id>" }
export const subscriptionApiService = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token
            if (token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getSubscriptions: builder.query({
            query: () => ({ url: 'get' })
        }),
        cancelSubscription: builder.mutation({
            query: (payload) => ({
                url: 'cancel',
                method: 'POST',
                body: typeof payload === 'object' ? payload : { subscriptionId: payload }
            })
        })
    })
})

export const {
    useGetSubscriptionsQuery,
    useCancelSubscriptionMutation,
} = subscriptionApiService