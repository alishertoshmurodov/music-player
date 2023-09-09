import "./SeekSlider.css";

function SeekSlider(props) {
  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    let seekto =
      props.currTrack.current.duration * (props.seekSliderValue / 100);

    // Set the current track position to the calculated seek position
    props.currTrack.current.currentTime = seekto;
  }

  return (
    <div className="seek-slider">
      <input
        type="range"
        value={props.value}
        min={1}
        max={100}
        onChange={seekTo}
      ></input>
    </div>
  );
}

export default SeekSlider;
