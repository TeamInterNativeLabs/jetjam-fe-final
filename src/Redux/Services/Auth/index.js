import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getApiBaseUrl } from '../../../Config/env'

const baseUrl = `${getApiBaseUrl()}/auth/`

export const authApiService = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: 'login',
                method: 'POST',
                body: { ...payload, source: "user", deviceId: localStorage.getItem("device_token") }
            })
        }),
        forgetPassword: builder.mutation({
            query: (payload) => ({
                url: 'forget-password',
                method: 'POST',
                body: payload
            })
        }),
        verifyOtp: builder.mutation({
            query: (payload) => ({
                url: 'verify-otp',
                method: 'POST',
                body: payload
            })
        }),
        resetPassword: builder.mutation({
            query: (payload) => ({
                url: 'reset-password',
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useLoginMutation,
    useForgetPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApiService