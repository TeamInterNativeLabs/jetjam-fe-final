import React, { useRef, useEffect } from 'react';
import './index.css'
import CustomAudioPlayer from '../AlbumRelease/AudioPlayer/AudioPlayer';
import { barVisualizer, jetText } from '../../../../assets';


function JetJamsLiveStream() {

    return (
        <section className='jet-jams-live-stream pb-sm-5 pb-4'>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-11 col-12">
                        <div className="px-lg-5 px-md-4">
                            <img src={jetText} alt="" className="img-fluid w-100" />
                        </div>
                        <div className="my-3">
                            <img src={barVisualizer} alt="" className="img-fluid" />
                        </div>
                        <CustomAudioPlayer />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default JetJamsLiveStream;
