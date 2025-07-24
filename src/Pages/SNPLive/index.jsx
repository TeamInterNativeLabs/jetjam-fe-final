import { useEffect, useState } from "react";
import { UserLayout } from "../../Components/Layout";
import "./style.css";
import Loader from "../../Components/Loader";

const SnpLive = () => {

    const channelName = "saturdayniteparty";
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (document.querySelector('script[src="https://embed.twitch.tv/embed/v1.js"]')) {
            setLoading(false)
            return;
        }

        const script = document.createElement('script');
        script.src = "https://embed.twitch.tv/embed/v1.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const player = new window.Twitch.Embed("twitch-embed", {
                channel: channelName,
                width: "100%",
                height: 500,
                theme: "dark",
                autoplay: true
            });
            player.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
                setLoading(false);
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <UserLayout>
            <Loader loading={loading} />
            <section className="beat-mixed-set">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11 col-12">
                            <h4 className="mb-3">SNP Live</h4>
                            <div id="twitch-embed"></div>
                        </div>
                    </div>
                </div>
            </section>
        </UserLayout>
    )
}

export default SnpLive