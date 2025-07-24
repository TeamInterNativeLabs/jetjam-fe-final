import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { barVisualizer, discIcon, jetText } from '../../../assets';
import CustomAudioPlayer from '../AlbumRelease/AudioPlayer/AudioPlayer';
import './index.css';

const LIVE_STREAM_URL = "https://cast2.my-control-panel.com/proxy/jetjamsj/stream"

function JetJamsLiveStream() {
  const [audioPlayed, setAudioPlayed] = useState(false);

  const audioAction = () => {
    setAudioPlayed(!audioPlayed)
  }

  return (
    <section className="jet-jams-live-stream pb-sm-5 pb-4" id='snp-live'>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-11 col-12">
            <div className="px-lg-5 px-md-4">
              <img src={jetText} alt="" className="img-fluid w-100" />
            </div>
            <div className="live-stream-audio-player">
              <div className="mt-5 mb-4">
                <img src={barVisualizer} alt="" className="img-fluid" />
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="flex-shrink-0">
                  <img src={discIcon} alt="" className={`img-fluid disc-img${audioPlayed ? ' disc-moving' : ''}`} />
                </div>
                <div className="flex-grow-1">
                  <CustomAudioPlayer custom_album={{
                    src: LIVE_STREAM_URL,
                    id: 1
                  }} audioAction={audioAction} editorNeeded={false} noplaylist />
                  <ReactPlayer
                    url={LIVE_STREAM_URL}
                    playing={audioPlayed}
                    controls
                    onError={(e) => console.error("Stream loading error:", e)}
                    style={{ display: "none" }}
                    stopOnUnmount
                  />
                </div>
                <div className="flex-shrink-0">
                  <img src={discIcon} alt="" className={`img-fluid disc-img${audioPlayed ? ' disc-moving' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JetJamsLiveStream;
