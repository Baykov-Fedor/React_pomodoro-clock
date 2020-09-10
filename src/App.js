import React from "react";

import Switcher from "./components/length_switcher/switcher.component";
import StartStop from "./components/start_stop/start_stop.component";
import Timer from "./components/timer/timer.component";

import "./App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      minutes: "25",
      seconds: "00",
      breakLength: 5,
      sessionLength: 25,
      timeGoing: false,
      sessionPlaying: true,
    };

    this.tickinClock = this.tickinClock.bind(this);
    this.reset = this.reset.bind(this);
    this.changeLength = this.changeLength.bind(this);
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
            minutes: this.fixTime(sessionLength),
            seconds: "00",
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
            minutes: this.fixTime(sessionLength),
            seconds: "00",
          });
        } else return;
    }
  };

  reset() {
    this.setState({
      minutes: "25",
      seconds: "00",
      breakLength: 5,
      sessionLength: 25,
      timeGoing: false,
      sessionPlaying: true,
    });
  }

  fixTime(number) {
    if (number < 10) return "0" + number;
    else return number.toString();
  }

  tickinClock() {
    if (this.state.timeGoing === false) return;
    let minutes = Number(this.state.minutes);
    let seconds = Number(this.state.seconds);
    if (minutes === 0 && seconds === 0) {
      let sessionPlaying = !this.state.sessionPlaying;
      this.setState({
        sessionPlaying,
        minutes: sessionPlaying
          ? this.state.sessionLength.toString()
          : this.state.breakLength.toString(),
        seconds: "00",
      });
      setTimeout(this.tickinClock, 1000);
      return;
    }
    if (seconds === 0) {
      this.setState({
        minutes: this.fixTime(minutes - 1),
        seconds: "59",
      });
    } else this.setState({ seconds: this.fixTime(seconds - 1) });
    setTimeout(this.tickinClock, 1000);
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
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            sessionPlaying={this.state.sessionPlaying}
          />
        </div>
        <div className="App--clock-controls">
          <StartStop
            time_going={this.state.timeGoing}
            reset={this.reset}
            start_stop={() => {
              this.setState(
                { timeGoing: !this.state.timeGoing },
                this.tickinClock
              );
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
