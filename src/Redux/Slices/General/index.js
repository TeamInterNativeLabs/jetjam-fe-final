import { createSlice } from "@reduxjs/toolkit"
import { generalApiService } from "../../Services/General"

let initialState = {
    general: null
}

export const generalSlice = createSlice({
    name: 'generalSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(generalApiService.endpoints.getData.matchFulfilled, (state, action) => {
            let { success, data } = action.payload
            if (success) {
                state.general = data
            }
        })
    }
})

export const { } = generalSlice.actions
export default generalSlice.reducer