import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import AudioPlayer from 'react-modern-audio-player';
import { useSelector } from 'react-redux';
import './AudioPlayer.css';
import Editor from './Editor';

const CustomAudioPlayer = (({ custom_album, editorNeeded, audioAction, noplaylist }) => {
  const [progressType, setProgressType] = useState('bar');
  const [playerPlacement, setPlayerPlacement] = useState('center');
  const [interfacePlacement, setInterfacePlacement] = useState({
    artwork: 'row1-1',
    trackInfo: 'row1-2',
    trackTimeCurrent: 'row1-3',
    trackTimeDuration: 'row1-4',
    progress: 'row1-5',
    repeatType: 'row1-6',
    volume: 'row1-7',
    playButton: 'row1-8',
    playList: 'row1-9',
  });
  const [playListPlacement, setPlayListPlacement] = useState('stack');
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState('right');
  const [theme, setTheme] = useState('light');
  const [width, setWidth] = useState('100%');
  const [activeUI, setActiveUI] = useState({ all: true });

  const { albums } = useSelector(state => state.playerSlice)

  return (
    <div className="App">
      <div className="player-container">
        <div className="album-release-container">
          {
            (albums && albums?.length > 0) || custom_album &&
            <AudioPlayer
              playList={custom_album ? [custom_album] : !noplaylist ? albums : []}
              activeUI={{
                ...activeUI,
                progress: 'bar'
              }}
              customIcons={{
                play: <button className='audio-play-btn' onClick={audioAction}><FontAwesomeIcon icon={faPlay} /></button>,
                pause: <button className='audio-play-btn' onClick={audioAction}><FontAwesomeIcon icon={faPause} /></button>,
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
      </div>
      {editorNeeded && <Editor />}
    </div>
  );
});

export default CustomAudioPlayer;
