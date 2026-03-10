import { useState, useMemo, useEffect } from "react";
import AudioPlayer from "react-modern-audio-player";
import { useSelector } from "react-redux";
import "./AudioPlayer.css";
import Editor from "./Editor";

const CustomAudioPlayer = ({ editorNeeded }) => {

    const { albums, track_id, isPlaying, playableAlbumIds } = useSelector(state => state.playerSlice);

    const audioInitialState = useMemo(() => {
        if (!track_id || !albums?.length) return { isPlaying: true, curPlayId: 1 };
        
        if (playableAlbumIds?.length) {
            const index = playableAlbumIds.indexOf(track_id);
            if (index !== -1) {
                return {
                    curPlayId: index + 1,
                    isPlaying: true
                };
            }
        }
        
        // Default to first track and auto-play
        return {
            curPlayId: 1,
            isPlaying: true
        };
    }, [track_id, playableAlbumIds, albums]);

    const [progressType, setProgressType] = useState("bar");
    const [playerPlacement, setPlayerPlacement] = useState("bottom-left");
    const [interfacePlacement, setInterfacePlacement] = useState();
    const [playListPlacement, setPlayListPlacement] = useState("bottom");
    const [volumeSliderPlacement, setVolumeSliderPlacement] = useState();
    const [theme, setTheme] = useState();
    const [width, setWidth] = useState("100%");
    const [activeUI, setActiveUI] = useState({ all: true });

    return (
        <div className="App">
            <div className="player-container">
                {
                    albums && albums.length > 0 &&
                    <AudioPlayer
                        playList={albums}
                        audioInitialState={audioInitialState}
                        activeUI={{
                            ...activeUI,
                            progress: progressType
                        }}
                        placement={{
                            player: playerPlacement,
                            interface: {
                                templateArea: interfacePlacement
                            },
                            playList: playListPlacement,
                            volumeSlider: volumeSliderPlacement
                        }}
                        rootContainerProps={{
                            colorScheme: theme,
                            width
                        }}
                    />
                }
            </div>
            {editorNeeded && (
                <Editor
                    setPlayerPlacement={setPlayerPlacement}
                    setProgressType={setProgressType}
                    setInterfacePlacement={setInterfacePlacement}
                    setPlayListPlacement={setPlayListPlacement}
                    setVolumeSliderPlacement={setVolumeSliderPlacement}
                    setTheme={setTheme}
                    setActiveUI={setActiveUI}
                    setWidth={setWidth}
                />
            )}
        </div>
    );
}
export default CustomAudioPlayer;