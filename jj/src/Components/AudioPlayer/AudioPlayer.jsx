import "./AudioPlayer.css";
import AudioPlayer from "react-modern-audio-player";
import { useState } from "react";
import { playList } from "./playList";
import Editor from "./Editor";

const CustomAudioPlayer = ({ editorNeeded }) => {
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
                <AudioPlayer
                    playList={playList}
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