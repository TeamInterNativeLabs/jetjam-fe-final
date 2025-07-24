import React from 'react';
import './index.css'
import SiteButton from '../../../../Components/Button/button';
import CustomAudioPlayer from './AudioPlayer/AudioPlayer';

const AlbumRelease = () => {
    return (
        <section className="album-release">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-6">
                        <CustomAudioPlayer />
                    </div>
                    <div className="col-xl-5 col-lg-6 ps-xxl-5">
                        <h3>album <span className="purple-text"> release</span></h3>
                        <p className="l-grey-text p-md">A diam sollicitudin tempor id eu nisl nunc. Sed arcu non odio euismod. Aliquet nibh praesent tristique</p>
                        <div className="d-flex mt-lg-5 mt-4 gap-3 flex-wrap">
                            <SiteButton className="border-btn">buy now</SiteButton>
                            <SiteButton className="border-btn">LEARN MORE</SiteButton>
                        </div>
                        <h5 className="mt-lg-5 mt-4">listen on:</h5>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AlbumRelease;
