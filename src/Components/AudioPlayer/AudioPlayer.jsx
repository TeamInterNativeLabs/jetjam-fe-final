import { useState } from "react";
import AudioPlayer from "react-modern-audio-player";
import { useSelector } from "react-redux";
import "./AudioPlayer.css";
import Editor from "./Editor";

const CustomAudioPlayer = ({ editorNeeded }) => {

    const { albums } = useSelector(state => state.playerSlice)

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