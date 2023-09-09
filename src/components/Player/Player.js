import { useRef, useState } from "react";
import Controls from "../Controls/Controls";
import Cover from "../Cover/Cover";
import VolumeBar from "../VolumeBar/VolumeBar";
import "./Player.css";
import SeekSlider from "../SeekSlider/SeekSlider";
import songs from "../../songs.json";

function Player() {
  const [songName, setSongName] = useState("Song Name");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekSliderValue, setSeekSliderValue] = useState(0);
  const [timer, setTimer] = useState("");
  const [image, setImage] = useState("");
  const curr_track = useRef(document.createElement("audio"));
  const data = useRef(songs);

  return (
    <div className="player">
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        curr_track={curr_track}
        songs={data.current}
        currTrack={curr_track}
        setImage={setImage}
        setSongName={setSongName}
        setSeekSliderValue={setSeekSliderValue}
        seekSliderValue={seekSliderValue}
        timer={timer}
        setTimer={setTimer}
      />
      <VolumeBar currTrack={curr_track} />
      <p className="player__song-name">{songName}</p>
      <SeekSlider
        value={seekSliderValue}
        setValue={setSeekSliderValue}
        currTrack={curr_track}
        seekSliderValue={seekSliderValue}
      />
      <Cover image={image} />
    </div>
  );
}

export default Player;
