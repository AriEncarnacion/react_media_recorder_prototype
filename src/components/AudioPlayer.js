import React, {useState, useRef} from "react";
import styles from '../styles/AudioPlayer.module.css'
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs"
import {FaPlay, FaPause} from "react-icons/fa"
import {MdRestartAlt} from "react-icons/md"

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
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime - 10;
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
  }

  const forwardThirty = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime + 10;
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
  }

  const restart = () => {
    audioPlayer.current.currentTime = 0;
    progressBar.current.value = 0;
    changePlayerCurrentTime();
  }

  return (
    <div className={styles.audioPlayer}>
      <audio onLoadedMetadata={onLoadedMetaData} ref={audioPlayer} src={"https://t4.bcbits.com/stream/d91f65c07ee53fcaea27068abdd31e1f/mp3-128/1014008581?p=0&ts=1635160938&t=9f653a5839cdd007295f28d2bdf5436044c87103&token=1635160938_6e7de04eb11720d47afd89cecb7893cd6efbe085"} preload={"metadata"}/>

      <button className={styles.restartSkip} onClick={restart}><MdRestartAlt></MdRestartAlt></button>
      <button className={styles.forwardBackward} onClick={backThirty}><BsArrowLeftShort/>10</button>
      <button className={styles.playPause} onClick={togglePlayPause}>{
        isPlaying ? <FaPause/> : <FaPlay className={styles.play}/>
      }</button>
      <button className={styles.forwardBackward} onClick={forwardThirty}>10<BsArrowRightShort/></button>



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