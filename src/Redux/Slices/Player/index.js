import { createSlice } from "@reduxjs/toolkit"
import { albumApiService } from "../../Services/Album";
import { imageUrl } from "../../../Config/env";

let initialState = {
    isPlaying: false,
    currentTrack: null,
    track_id: null,
    albums: [],
    playableAlbumIds: []
}

export const playerSlice = createSlice({
    name: 'playerSlice',
    initialState,
    reducers: {
        play: (state, action) => {
            state.isPlaying = true;
            state.track_id = action.payload;
            
            // If no albums are set, this might be a single track play
            // The component should handle setting up the album data
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
            let ids = []

            if (tracks && tracks?.length > 0) {
                // Include albums that are either playable OR have a file/file_url
                const playable = tracks.filter(item =>
                    item.playable === true ||
                    item.file_url ||
                    item.file
                )
                ids = playable.map(item => item._id)
                albums_to_set = playable.map((item, index) => ({
                    name: item.name,
                    write: item.singer || "JetJams",
                    src: imageUrl(item?.file_url || item?.file),
                    id: index + 1
                }))
            }

            state.albums = albums_to_set
            state.playableAlbumIds = ids
        },
    }
})

export const { play, pause, setTrack, setAlbums } = playerSlice.actions
export default playerSlice.reducer