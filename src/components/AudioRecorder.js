import React, {useEffect, useState} from "react";
import {ReactMic} from 'react-mic';

const AudioRecorder = () => {
  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
  }

  return (
    <div>
      <header>audio recorder</header>
      <ReactMic
        record={record}
        className={"reactMic-recorder"}
        onStop={onStop}
        onData={onData} />
      <button onClick={startRecording} type="button">Start</button>
      <button onClick={stopRecording} type="button">Stop</button>
    </div>
  )
}

export default AudioRecorder;