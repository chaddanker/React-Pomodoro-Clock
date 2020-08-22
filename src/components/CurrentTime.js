import React, { Component } from "react";

class CurrentTime extends Component {
    state = {
        time: this.getDate().toLocaleTimeString(),
    };

    componentDidMount() {
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
      }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getDate() {
        const response = new Date();
        return response;
    }

    tick() {
        this.setState({
          time: new Date().toLocaleTimeString()
        });
      }

    render() {
        return (
            <p style={{ margin: 0, padding: 0, paddingTop: 20, color: "gray"}}>
                {this.state.time}
            </p>
        );
    }
}

export default CurrentTime;
