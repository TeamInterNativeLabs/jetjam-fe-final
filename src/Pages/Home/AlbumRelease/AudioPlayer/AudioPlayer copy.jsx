import "./AudioPlayer.css";
import AudioPlayer from "react-modern-audio-player";
import { useState } from "react";
import { playList } from "./playList";
import Editor from "./Editor";

const CustomAudioPlayer = ({ editorNeeded }) => {
  const [progressType, setProgressType] = useState("bar");
  const [playerPlacement, setPlayerPlacement] = useState("center");
  const [interfacePlacement, setInterfacePlacement] = useState({
    artwork: "row1-1",
    trackInfo: "row1-2",
    trackTimeCurrent: "row1-3",
    trackTimeDuration: "row1-4",
    progress: "row1-5",
    repeatType: "row1-6",
    volume: "row1-7",
    playButton: "row1-8",
    playList: "row1-9"
  });
  const [playListPlacement, setPlayListPlacement] = useState("stack");
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState("right");
  const [theme, setTheme] = useState("light");
  const [width, setWidth] = useState("100%");
  const [activeUI, setActiveUI] = useState({ all: true });

  return (
    <div className="App">
      <div className="player-container">
        <div className="album-release-container">
          <AudioPlayer
            playList={playList}
            activeUI={{
              ...activeUI,
              progress: 'bar'
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
      </div>
      {editorNeeded && <Editor />}
    </div>
  );
}
export default CustomAudioPlayer;
