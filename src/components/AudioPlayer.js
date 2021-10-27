import React, {useState, useRef, useEffect} from "react";
import styles from '../styles/AudioPlayer.module.css'
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs"
import {FaPlay, FaPause} from "react-icons/fa"

const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference for audio components
  const progressBar = useRef(); // reference for progress bar
  const animationRef = useRef(); // reference the scrubber animation

  // updates
  const onLoadedMetaData = () => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const togglePlayPause = () => {
    const prevVal = isPlaying;
    setIsPlaying(!prevVal);
    if (!prevVal) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime - 30;
    changeRange();
  }

  const forwardThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime + 30;
    changeRange();
  }

  return (
    <div className={styles.audioPlayer}>
      <audio onLoadedMetadata={onLoadedMetaData} ref={audioPlayer} src={"https://t4.bcbits.com/stream/8fa46302de0038d722200f913c34cb57/mp3-128/2958157925?p=0&ts=1635454485&t=0a77df45b715777619185e755f1308bc38d22ed2&token=1635454485_d96f01ed204fb8d144c47b22e7ad6d5bc36d158f"} preload={"metadata"}/>

      <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort/>30</button>

      <button className={styles.playPause} onClick={togglePlayPause}>{
        isPlaying ? <FaPause/> : <FaPlay className={styles.play}/>
      }</button>

      <button className={styles.forwardBackward} onClick={forwardThirty}>30<BsArrowRightShort/></button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          className={styles.progressBar}
          type={"range"}
          defaultValue={"0"}
          ref={progressBar}
          onChange={changeRange}/>
      </div>

      {/*duration*/}
      <div className={styles.duration}>{calculateTime(duration)}</div>
    </div>
  )
}

export default AudioPlayer;
