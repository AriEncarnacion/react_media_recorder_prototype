import logo from './logo.svg';
import './App.css';
import AudioPlayer from "./components/AudioPlayer";

function AudioRecorder() {
  return (

    <div className="recorder">
      <header>
        <title>Media Recorder</title>
      </header>

      <main className={'recorder-main'}>
        <AudioPlayer/>
      </main>
    </div>
  );
}

export default AudioRecorder;
