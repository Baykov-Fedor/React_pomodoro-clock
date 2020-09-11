import React from "react";

import Switcher from "./components/length_switcher/switcher.component";
import StartStop from "./components/start_stop/start_stop.component";
import Timer from "./components/timer/timer.component";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      time: 1500,
      breakLength: 5,
      sessionLength: 25,
      timeGoing: false,
      sessionPlaying: true,
      intervalID: "",
    };

    this.tickinClock = this.tickinClock.bind(this);
    this.reset = this.reset.bind(this);
    this.changeLength = this.changeLength.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  playSound() {
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();
  }

  changeLength = (value, id) => {
    if (this.state.timeGoing === true) return;
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    if (value === "+") {
      if (id === "break") {
        if (breakLength !== 60) {
          this.setState({ breakLength: ++breakLength });
        } else return;
      } else if (id === "session") {
        if (sessionLength !== 60) {
          this.setState({
            sessionLength: ++sessionLength,
            time: sessionLength * 60,
          });
        } else return;
      }
    } else if (value === "-") {
      if (id === "break") {
        if (breakLength !== 1) {
          this.setState({ breakLength: --breakLength });
        } else return;
      } else if (id === "session")
        if (sessionLength !== 1) {
          this.setState({
            sessionLength: --sessionLength,
            time: sessionLength * 60,
          });
        } else return;
    }
  };

  reset() {
    this.setState({
      time: 1500,
      breakLength: 5,
      sessionLength: 25,
      timeGoing: false,
      sessionPlaying: true,
      intervalID: "",
    });
    clearInterval(this.state.intervalID);
    const sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  timerControl() {
    const timeGoing = !this.state.timeGoing;
    this.setState({
      timeGoing,
    });
    if (timeGoing) {
      this.setState({
        intervalID: setInterval(() => this.tickinClock(), 1000),
      });
    } else clearInterval(this.state.intervalID);
  }

  tickinClock() {
    if (this.state.time === 0) {
      this.playSound();
      let sessionPlaying = !this.state.sessionPlaying;
      this.setState({
        sessionPlaying,
        time: sessionPlaying
          ? this.state.sessionLength * 60
          : this.state.breakLength * 60,
      });
    } else this.setState({ time: this.state.time - 1 });
  }

  convertTime() {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="App--clock-settings">
          <Switcher
            name="Break Length"
            id="break"
            length={this.state.breakLength}
            changeLength={this.changeLength}
          />
          <Switcher
            name="Session Length"
            id="session"
            length={this.state.sessionLength}
            changeLength={this.changeLength}
          />
        </div>
        <div>
          <Timer
            time={this.convertTime}
            sessionPlaying={this.state.sessionPlaying}
          />
        </div>
        <div className="App--clock-controls">
          <StartStop
            time_going={this.state.timeGoing}
            reset={this.reset}
            start_stop={this.timerControl}
          />
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          preload="auto"
        ></audio>
      </div>
    );
  }
}

export default App;
