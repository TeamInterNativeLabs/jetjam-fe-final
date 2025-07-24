import React from 'react';
import './index.css'
import { fitMixImg } from '../../../../assets';

const FitMixMessage = () => {
  return (
    <section className="fit-mix-message py-sm-5 py-4">
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
                            <div className="fit-mix-img">
                                <img src={fitMixImg} alt="" className="img-fluid" />
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
