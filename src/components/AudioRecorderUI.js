import {AudioRecorderAPI} from "./AudioRecorderAPI";
import {useState} from "react";

(async () => {
  const audioInput = await AudioRecorderAPI();
  audioInput.start();

  setTimeout(async () => {
    const audio = await audioInput.stop();
    audio.play();
  }, 3000);
})();

const AudioRecorderUI = () => {
  // const [isRecording, setIsRecording] = useState(false);
  //
  // const startRecording = () => {
  //
  // };
  //
  // const stopRecording = () => {
  //
  // };

  return (
    <div>
      <header>audio recorder ui</header>
      {/*<button onClick={startRecording}>start recording</button>*/}
      {/*<button onClick={stopRecording}>stop recording</button>*/}
    </div>
  )
}

export default AudioRecorderUI;