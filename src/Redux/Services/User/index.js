import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/user/`

export const userApiService = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => 'my-profile'
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: 'create',
                method: 'POST',
                body: payload
            })
        }),
        changePassword: builder.mutation({
            query: (payload) => ({
                url: 'change-password',
                method: 'POST',
                body: payload
            })
        }),
        updateProfile: builder.mutation({
            query: (payload) => ({
                url: 'update',
                method: 'PUT',
                body: payload
            })
        }),
    })
})

export const {
    useGetProfileQuery,
    useRegisterMutation,
    useChangePasswordMutation,
    useUpdateProfileMutation
} = userApiService