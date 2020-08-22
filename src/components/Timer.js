import React, { Component } from 'react';
import CurrentTime from './CurrentTime';

class Timer extends Component {

    state = { 
        interval: this.session,
        timer: {
            minutes: this.session,
            seconds: 0,
            milliseconds: 1000
        },
        hasEnded: false,
        isActive: false,
        breakMode: false,
        session: 25,
        break: 5
    };

    componentDidMount() {
        this.setState(state => ({
            timer: {
                minutes: state.session,
                seconds: 0,
                milliseconds: 1000
            }
        }));

    }
    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
    }

    playSoundAndPauseTimer() {
        this.stopTimer();

        let stopped = true;

        setTimeout(() =>{
            stopped = false;
            document.getElementById("beep").pause();
            this.updateTimer();
        }, 1000);

        if(stopped) {
            document.getElementById("beep").play();
        } 
    }

    updateTimer() {

        this.setState({
            isActive: true
        });
        
        this.timerIntervalID = setInterval(() => {

            if(!this.state.breakMode && (this.state.timer.minutes === 0 && this.state.timer.seconds === 0)) { 
                this.playSoundAndPauseTimer();
                setTimeout(this.setState({
                    timer: {
                        minutes: this.state.break,
                        seconds: 0
                    },
                    breakMode: true                    
                }), 10);
                
                return;
             } else if(this.state.breakMode && (this.state.timer.minutes === 0 && this.state.timer.seconds === 0)) {
                this.playSoundAndPauseTimer();
                setTimeout(this.setState({
                    timer: {
                        minutes: this.state.session,
                        seconds: 0
                    },
                    breakMode: false                    
                }), 10);
                
                return;
             }

            this.setState(state =>  
            state.timer.seconds === 0 ?
            ({
                timer: {
                    minutes: state.timer.minutes - 1,
                    seconds: 60 - 1
                }
            }) : ({
                timer: {
                    minutes: state.timer.minutes,
                    seconds: state.timer.seconds - 1                   
                }
            }));
            
        }, 1000);      
    }

    stopTimer(end) {
        clearInterval(this.timerIntervalID);

        this.setState({
            isActive: false
        });

        if(end) { 
            this.setState({
                hasEnded: true
            });
        }
    }

    reset() {
        clearInterval(this.timerIntervalID);
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        this.setState(state => ({  
            session: 25,
            break: 5,
            hasEnded: false,
            isActive: false,
            breakMode: false,
            timer: {
                minutes: 25,
                seconds: 0,
                milliseconds: 1000
        }}));

    }

    sessionDecrement = () => {
        if(this.state.session > 1 && this.state.session < 60) {
            if(!this.state.breakMode){
                this.setState(state => ({
                    session: state.session - 1,
                    timer: {
                        minutes: state.session - 1,
                        seconds: 0,
                        milliseconds: 1000
                    }
                }));
            } else {
                this.setState(state => ({
                    session: state.session - 1
                }));            
            }
        }
    }

    sessionIncrement = () => {
        if(this.state.session > 1 && this.state.session < 60) {
            if(!this.state.breakMode){
                this.setState(state => ({
                    session: state.session + 1,
                    timer: {
                        minutes: state.session + 1,
                        seconds: 0,
                        milliseconds: 1000
                    }
                }));
            } else {
                this.setState(state => ({
                    session: state.session + 1
                }));            
            }
        }
    }

    breakDecrement = () => {
        if(this.state.break > 1 && this.state.break < 60) {
            if(this.state.breakMode){
                this.setState(state => ({
                    break: state.break - 1,
                    timer: {
                        minutes: state.break - 1,
                        seconds: 0,
                        milliseconds: 1000
                    }
                }));
            } else {
                this.setState(state => ({
                    break: state.break - 1
                }));            
            }
        }
    }

    breakIncrement = () => {
        if(this.state.break > 0 && this.state.break < 60){
            if(this.state.breakMod){
                this.setState(state => ({
                    break: state.break + 1,
                    timer: {
                        minutes: state.break + 1,
                        seconds: 0,
                        milliseconds: 1000
                    }
                }));
            } else {
                this.setState(state => ({
                    break: state.break + 1
                }));            
            }
        }
    }

    formatTimer = ({minutes, seconds}) => {
            if(String(minutes).length === 1) {
                minutes = `0${minutes}`;
            } 
            if(String(seconds).length === 1) {
                seconds = `0${seconds}`;
            } 
        return String(`${minutes}:${seconds}`);
    };

    renderTimer() {
        return (
            <h1
                id="time-left"
                style={{
                    color: this.state.timer.minutes === 0 ? "red" : "black"
                }}
            >
                {this.formatTimer(this.state.timer)}
            </h1>
        );
    }

    renderTools() {
        return(
            <div className="text-center">
                <div className="row" style={{ width: "12.2rem", margin: "0 auto" }}>
                    <div className="item" style={{ marginRight: "1rem", backgroundColor: "#fafafa", padding: 5, boxShadow: "0 0 5px rgba(0,0,0,0.2)", }}>
                        <p id="session-label">Session Length</p>
                        <h3 id="session-length">{this.state.session}</h3>
                        <div class="btn-group">
                            <button className="btn btn-md btn-success" onClick={() => this.sessionIncrement()} id="session-increment">
                                <i className="fas fa-plus"></i>
                            </button>
                            <button className="btn btn-md btn-success" onClick={() => this.sessionDecrement()} id="session-decrement">
                            <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div  className="item" style={{ backgroundColor: "#fafafa", padding: 5, boxShadow: "0 0 5px rgba(0,0,0,0.2)", }}>
                        <p id="break-label">Break Length</p>
                        <h3 id="break-length">{this.state.break}</h3>
                        <div class="btn-group">
                            <button className="btn btn-md btn-success" onClick={() => this.breakIncrement()} id="break-increment" >
                                <i className="fas fa-plus"></i>
                            </button>
                            <button className="btn btn-md btn-success" onClick={() => this.breakDecrement()} id="break-decrement">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div 
            className="card text-center"
            style={{ 
                    fontFamily: "'Bebas Neue', cursive", 
                    padding: "20px 0", 
                    width: "15rem", 
                    boxShadow: "0 0 5px #28a745",
                    margin: "50px auto",
                    borderRadius: "0"
                }}
        >
            <h1 class="card-title">Pomodoro Clock</h1>
            <hr style={{ marginBottom: "20px", marginTop: 0 }}/>
            {this.renderTools()}
            
                <div className="card-body">
                    <div style={{ boxShadow: "0 0 5px rgba(0,0,0,0.2)", backgroundColor: "#fafafa", padding: "5px 0"  }}>
                    <h3 id="timer-label">{this.state.breakMode ? "Break" : "Session"}</h3>
                    {this.renderTimer()}
                    <div class="btn-group">
                        <button className={`btn btn-mid btn-${this.state.isActive ? 'danger' : 'success'}`} id="start_stop" onClick={this.state.isActive ? () => this.stopTimer() : () => this.updateTimer()}>{this.state.isActive ? <i class="fas fa-pause"></i> : <i class="fas fa-play"></i>}</button>
                        <button className="btn btn-mid btn-warning" id="reset" onClick={() => this.reset()}><i class="fas fa-sync"></i></button>
                    </div>
                    </div>
                    <audio id="beep" src="http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3"></audio>
                    <CurrentTime />
                </div>
            
        </div>
        );
    }
}

export default Timer;
