import { ReactComponent as Previous } from "../../assets/previous-svgrepo-com.svg";
import { ReactComponent as Play } from "../../assets/play-stream-svgrepo-com.svg";
import { ReactComponent as Next } from "../../assets/next-svgrepo-com.svg";
import "./Controls.css";
import { useCallback, useEffect } from "react";

function Controls(props) {
  function loadTrack(track_index) {
    clearInterval(props.setTimer);
    resetValues();

    props.currTrack.current.src = props.songs[track_index].path;
    props.currTrack.current.load();

    props.setImage(props.songs[track_index].image);
    props.setSongName(props.songs[track_index].name);

    props.setTimer(setInterval(seekUpdate, 1000));

    props.currTrack.current.addEventListener("ended", nextTrack);
  }

  function resetValues() {
    props.setSeekSliderValue(0);
  }

  function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(props.currTrack.current.duration)) {
      seekPosition =
        props.currTrack.current.currentTime *
        (100 / props.currTrack.current.duration);
      props.setSeekSliderValue(seekPosition);

      let currentMinutes = Math.floor(props.currTrack.current.currentTime / 60);
      let currentSeconds = Math.floor(
        props.currTrack.current.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(props.currTrack.current.duration / 60);
      let durationSeconds = Math.floor(
        props.currTrack.current.duration - durationMinutes * 60
      );

      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }
    }
  }

  function playpauseTrack() {
    if (!props.isPlaying) playTrack();
    else pauseTrack();
  }

  function playTrack() {
    props.currTrack.current.play();
    props.setIsPlaying(true);
    document.querySelector(".cover").classList.add("rotate-center");
    document.querySelector(".seek-slider").style = "opacity: 1";
  }

  function pauseTrack() {
    props.currTrack.current.pause();
    props.setIsPlaying(false);
    document.querySelector(".cover").classList.remove("rotate-center");
    document.querySelector(".seek-slider").removeAttribute("style");
  }

  function nextTrack() {
    if (props.trackIndex < props.songs.length - 1) {
      props.setTrackIndex((prevState) => prevState + 1);
    } else {
      props.setTrackIndex(0);
    }

    loadTrack(props.trackIndex);
    playTrack();
  }

  function prevTrack() {
    if (props.trackIndex > 0) {
      props.setTrackIndex((prevState) => prevState - 1);
    } else {
      props.setTrackIndex(props.songs.length - 1);
    }

    loadTrack(props.trackIndex);
    playTrack();
  }

  useEffect(() => {
    loadTrack(props.trackIndex);
  }, []);

  return (
    <div className="controls">
      <div className="controls__previous controls__button" onClick={prevTrack}>
        <Previous width={32} height={32} />
      </div>
      <div className="controls__play controls__button" onClick={playpauseTrack}>
        <Play width={48} height={48} />
      </div>
      <div className="controls__next controls__button" onClick={nextTrack}>
        <Next width={32} height={32} />
      </div>
    </div>
  );
}

export default Controls;
