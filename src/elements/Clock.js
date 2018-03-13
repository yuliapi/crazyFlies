import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";

// import ClockField from './ClockField'
import TempClockField from './TempClockField'
import {resetGame, showModal} from "../actions";
import {TIMER_LENGTH} from "../constants/fly-constants";

const mapStateToProps = state => {
    return {timerStatus: state.timerStatus, isGameStarted: state.gameStarted}
};
const mapDispatchToProps = dispatch => {
    return {
        resetGame: () => dispatch(resetGame()),

        showModal: (modal) => dispatch(showModal(modal)),
    }
};

const StyledDiv = styled.div`
 margin-right: 40px;
 display: flex;

`;

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalTime: TIMER_LENGTH,
            minutesTens: 0,
            minutesTensShuffle: false,
            minutes: TIMER_LENGTH / 60 - 1,
            minutesShuffle: false,
            secondsTens: 5,
            secondsTensShuffle: false,
            seconds: 9,
            secondsShuffle: false,
            isPaused: this.props.timerStatus === 'paused'
        }
    }

    componentDidMount() {

        this.progress = setInterval(() => this.startCount(), 1000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isGameStarted === true && nextProps.timerStatus === 'paused') {
            this.setState({isPaused: true})
        }
    }

    componentWillUnmount() {
        clearInterval(this.progress)
    }

    startCount = () => {console.log(`timer paused:  ${this.state.isPaused}`)
        if (this.state.isPaused === false) {
            let total = this.state.totalTime;

            this.setState({totalTime: --total});
            let seconds = this.state.totalTime % 60;
            const newShuffle = !this.state.secondsShuffle;
            this.setState({seconds: seconds % 10, secondsShuffle: newShuffle});
            if (this.state.secondsTens !== Math.floor(seconds / 10)) {
                const newShuffle = !this.state.secondsTensShuffle;
                this.setState({secondsTens: Math.floor(seconds / 10), secondsTensShuffle: newShuffle});
            }
            if (this.state.minutes !== Math.floor(this.state.totalTime / 60)) {
                const newShuffle = !this.state.minutesShuffle;
                this.setState({minutes: Math.floor(this.state.totalTime / 60), minutesShuffle: newShuffle})
            }
            if (total === 0) {

                this.props.showModal({modalType: 'outOfTime'});
                clearInterval(this.progress)
            }
        }
        if (this.state.isPaused === true) {
            clearInterval(this.progress)
        }

    };

    render() {
        return (
            <StyledDiv>
                <TempClockField data={this.state.minutesTens} shuffle={this.state.minutesTensShuffle}/>
                <TempClockField data={this.state.minutes} shuffle={this.state.minutesShuffle}/>
                <TempClockField data=':'/>
                <TempClockField data={this.state.secondsTens} shuffle={this.state.secondsTensShuffle}/>
                <TempClockField data={this.state.seconds} shuffle={this.state.secondsShuffle}/>
            </StyledDiv>
        )
    }
}

const ConnectedClock = connect(mapStateToProps, mapDispatchToProps)(Clock)
export default ConnectedClock;
