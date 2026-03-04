import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { UserLayout } from "../../Components/Layout";
import { useGetAlbumsQuery } from "../../Redux/Services/Album";
import { useGetGenreStatsQuery } from "../../Redux/Services/Genre";
import BeatmixPlayStation from "./AlbumRelease/BeatmixPlayStation";
import { Banner } from "./Banner";
import ShadowDivider from "./Divider";
import FitMixMessage from "./FitMixMessage";
import HomeVideo from "./HomeVideo/HomeVideo";
import "./index.css";
import JetJamsLiveStream from "./JetJamsLiveStream";
import SaturdayNiteParty from "./SaturdayNiteParty";
import SubscriptionPlans from "./SubscriptionPlans";
import { TrendingDanceAndFitness } from "./TrendingDanceAndFitness";
import { setAlbums } from "../../Redux/Slices/Player";

export const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: genreStatsData } = useGetGenreStatsQuery(
    {},
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const { data: albums, isSuccess: albumSuccess } = useGetAlbumsQuery(
    {},
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const { data: free_albums } = useGetAlbumsQuery(
    { free: true },
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const freeDemosDeduped = React.useMemo(() => {
    const list = free_albums?.data ?? [];
    const seen = new Set();
    return list.filter((item) => {
      const key = item?._id ?? item?.id;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [free_albums?.data]);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    if (albumSuccess) {
      dispatch(setAlbums(albums?.data));
    }
  }, [albumSuccess, albums]);

  return (
    <UserLayout>
      <Banner data={genreStatsData?.data} />
      <ShadowDivider />
      <BeatmixPlayStation data={freeDemosDeduped} />
      <div id="fitmix-section">
        <FitMixMessage />
      </div>
      <HomeVideo />
      <TrendingDanceAndFitness />
      <JetJamsLiveStream />
      <div id="subscription-section">
        <SubscriptionPlans showViewAll />
      </div>
      <SaturdayNiteParty />
    </UserLayout>
  );
};
