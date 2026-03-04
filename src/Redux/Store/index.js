import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { toast } from "react-toastify"
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { albumApiService } from "../Services/Album"
import { authApiService } from "../Services/Auth"
import { feedbackApiService } from "../Services/Feedback"
import { generalApiService } from "../Services/General"
import { genreApiService } from "../Services/Genre"
import { packageApiService } from "../Services/Packages"
import { snpvideoApiService } from "../Services/SnpVideo"
import { subscriptionApiService } from "../Services/Subscription"
import { userApiService } from "../Services/User"
import AuthSlice, { logout } from "../Slices/Auth"
import GeneralSlice from "../Slices/General"
import PlayerSlice from "../Slices/Player"

const apiErrorHandler = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        if (action && action.payload) {
            const { data, status } = action.payload || {}
            const message =
                data?.message ||
                (action.payload?.error && String(action.payload.error)) ||
                (action.payload?.message && String(action.payload.message)) ||
                (action.payload?.status === 'FETCH_ERROR' && 'Unable to reach server. Is the backend running?') ||
                'Something went wrong.'

            toast.error(message)

            if (status === 500) {
                store.dispatch(logout())
            }
        }
    }

    return next(action);
};

const persistConfig = {
    key: 'jetjams-9915aba1-7845-4aee-9c1f-f9b28e8fa2fb',
    storage: storage
}

export const rootReducers = combineReducers({
    authSlice: AuthSlice,
    generalSlice: GeneralSlice,
    playerSlice: PlayerSlice,
    [authApiService.reducerPath]: authApiService.reducer,
    [userApiService.reducerPath]: userApiService.reducer,
    [albumApiService.reducerPath]: albumApiService.reducer,
    [generalApiService.reducerPath]: generalApiService.reducer,
    [packageApiService.reducerPath]: packageApiService.reducer,
    [subscriptionApiService.reducerPath]: subscriptionApiService.reducer,
    [snpvideoApiService.reducerPath]: snpvideoApiService.reducer,
    [genreApiService.reducerPath]: genreApiService.reducer,
    [feedbackApiService.reducerPath]: feedbackApiService.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })
        .concat(authApiService.middleware)
        .concat(userApiService.middleware)
        .concat(generalApiService.middleware)
        .concat(albumApiService.middleware)
        .concat(packageApiService.middleware)
        .concat(subscriptionApiService.middleware)
        .concat(snpvideoApiService.middleware)
        .concat(genreApiService.middleware)
        .concat(feedbackApiService.middleware)
        .concat(apiErrorHandler)
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)