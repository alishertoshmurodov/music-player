import { useState } from "react";
import { ReactComponent as VolumeDown } from "../../assets/volume-cross.svg";
import { ReactComponent as VolumeUp } from "../../assets/volume-loud.svg";
import "./VolumeBar.css";

function VolumeBar(props) {
  const [volume, setVolume] = useState(100);

  function changeHandler(e) {
    setVolume(e.target.value);
    setVolumeF();
  }

  function setVolumeF() {
    props.currTrack.current.volume = volume / 100;
  }

  return (
    <div className="volume-bar">
      <VolumeDown />
      <input
        className="volume-bar__slider"
        type="range"
        min={1}
        max={100}
        value={volume}
        onChange={changeHandler}
      ></input>
      <VolumeUp />
    </div>
  );
}

export default VolumeBar;
