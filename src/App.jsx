import "bootstrap/dist/css/bootstrap.css";
import UserRoutes from "./Routes";
import "./assets/css/styles.css";
import CustomAudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import { useSelector } from "react-redux";

const App = () => {
  const { isPlaying } = useSelector((state) => state.playerSlice);

  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};

  return (
    <>
      <UserRoutes />
      {isPlaying && <CustomAudioPlayer />}
    </>
  );
};

export default App;
