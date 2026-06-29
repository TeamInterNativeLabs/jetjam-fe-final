import React from 'react';
import './index.css'
import { fitMixImg } from '../../../assets';

const FitMixMessage = () => {
  return (
    <section className="fit-mix-message pb-sm-5 pb-4" id='fitMixMessage'>
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-11 col-12">
                    <div className="row align-items-center">
                        <div className="col-lg-7 pe-xl-5">
                            <h4 className="hollow-text">Fit-Mix Message</h4>
                            <h3>Welcome to the <span className="gradient-text"> New Jetjams.net </span> Website</h3>
                            <p className="l-grey-text"> I could do my Ed Sullivan imitation, but... "let's bring him out".... This is Mixmaster Johnny O, welcome to Jetjams.net. Here at jetjams.net our mission is to beatmix the best dance hits of the 80's and 90's 24 hours-a-day. You can find Jetjams.net on TuneIn, Simple Radio, and Caster.FM. Be sure to check out the ultra secure Beatmix Market. I say that, because I worked in the Credit Card Industry. Anyway, if you hear a beatmix set you like, download it to your phone for only $3. If you lose it, you can always log into your account and download all the sets you purchased forever. Before I let you go... Dance, toe-tap, sing, headphones on for the Saturday Nite Party 9pm EST. Join Producer Greg and me Johnny O your Mixmaster, beatmixing your favorite party music mixes of the 80's and 90's. I'll see you then!</p>
                        </div>
                        <div className="col-lg-5">
                            <div className="fit-mix-video" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", borderRadius: "10px" }}>
                                {/* Replace the src URL below with your actual YouTube embed link when you have it */}
                                <iframe 
                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                    src="https://www.youtube.com/embed/invalid_video_id" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default FitMixMessage;
