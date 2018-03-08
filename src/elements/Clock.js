import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";

// import ClockField from './ClockField'
import TempClockField from './TempClockField'
import {resetGame} from "../actions";
import {TIMER_LENGTH} from "../constants/fly-constants";

const mapStateToProps = state => {
    return {isTimerActive: state.timerActive}
};
const mapDispatchToProps = dispatch => {
    return {resetGame: () => dispatch(resetGame())}
};
const StyledClock = styled.div`
 margin-right: 40px;
 display: flex;
`;


class Clock extends Component {
    constructor() {
        super();
        this.state = {
            totalTime: TIMER_LENGTH,
            minutesTens: 0,
            minutes: TIMER_LENGTH / 60,
            secondsTens: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        this.progress = setInterval(() => this.startCount(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.progress)
    }

    startCount = () => {
        let total = this.state.totalTime;

        this.setState({totalTime: --total});
        let seconds = this.state.totalTime % 60;
        this.setState({seconds: seconds % 10});
        if (this.state.secondsTens !== Math.floor(seconds / 10)) {
            this.setState({secondsTens: Math.floor(seconds / 10)});
        }
        if (this.state.minutes !== Math.floor(this.state.totalTime / 60)) {
            this.setState({minutes: Math.floor(this.state.totalTime / 60)})
        }
        if (total === 0) {
            this.props.resetGame();
            clearInterval(this.progress)
        }
    };

    render() {
        return (
            <StyledClock>
                <TempClockField data={this.state.minutesTens}/>
                <TempClockField data={this.state.minutes}/>
                <TempClockField data=':'/>
                <TempClockField data={this.state.secondsTens}/>
                <TempClockField data={this.state.seconds}/>
            </StyledClock>
        )
    }
}

const ConnectedClock = connect(mapStateToProps, mapDispatchToProps)(Clock)
export default ConnectedClock;
