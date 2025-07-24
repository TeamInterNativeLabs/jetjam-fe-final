import { createSlice } from "@reduxjs/toolkit"
import { albumApiService } from "../../Services/Album";

let initialState = {
    isPlaying: false,
    currentTrack: null,
    track_id: null,
    albums: []
}

export const playerSlice = createSlice({
    name: 'playerSlice',
    initialState,
    reducers: {
        play: (state, action) => {
            state.isPlaying = true;
            state.track_id = action.payload
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        setTrack: (state, action) => {
            state.currentTrack = action.payload;
            state.isPlaying = true;
        },
        setAlbums: (state, action) => {
            let tracks = action?.payload
            let albums_to_set = []

            if (tracks && tracks?.length > 0) {
                albums_to_set = tracks.filter(item => item.playable).map((item, index) => ({
                    name: item.name,
                    write: "JetJams",
                    src: `${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${item?.file_url}`,
                    id: index + 1
                }))
            }

            state.albums = albums_to_set
        },
    }
})

export const { play, pause, setTrack, setAlbums } = playerSlice.actions
export default playerSlice.reducer