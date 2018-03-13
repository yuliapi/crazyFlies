import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import Button from './Button'
import Score from './Score'
import Clock from '../elements/Clock'
import {TIMER_LENGTH} from "../constants/fly-constants";


import {startGame, startTimer, illegalHuntResolved, noFliesWarning, resetGame} from "../actions/index";

const mapStateToProps = state => {
    return {
        timerStatus: state.timerStatus,
        isGameStarted: state.gameStarted,
        illegalHunt: state.illegalHunt,
        fliesTotal: state.flies.length,
        time: state.completedTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startGame: () => dispatch(startGame()),
        startTimer: () => dispatch(startTimer()),
        illegalHuntResolved: () => dispatch(illegalHuntResolved()),
        noFliesWarning: () => dispatch(noFliesWarning()),
        resetGame: () => dispatch(resetGame())
    };
};
const timeProgress = keyframes`
  from {width: 0;}

  to {width: 100%;}
`;
const time = `${TIMER_LENGTH}s`;
const StyledProgressInner = styled.div`

 height: inherit;
 background-color: rgb(0, 255, 255);
 animation: ${timeProgress} ${time} linear;
  mix-blend-mode: difference;
   animation-play-state: running

`;
const StyledInner = styled.div`
width: 100%;
 height: inherit;
 background-color: rgb(0, 255, 255);
  mix-blend-mode: difference;
`;
const StyledWrapOne = styled.div`
height: inherit;
  width: 100%;
  position: absolute;  
  color: rgb(255, 0, 0); 
`;
const StyledWrapTwo = styled.div`
height: inherit;
 position: absolute;
 width: 100%;
 text-align: center;
 background-color: rgb(255, 255, 255);
 mix-blend-mode: difference;
`;


const arrowAnimationLeft = keyframes`
  from {
        transform: translateX(0) rotate(90deg);
    }
    to {
        transform: translateX(10px) rotate(90deg);;
    }
`;
const arrowAnimationRight = keyframes`
  from {
        transform: translateX(10px) rotate(-90deg);
    }
    to {
        transform: translateX(0px) rotate(-90deg);;
    }
`;
const StyledArrow = styled.span`
 color: rgb(255, 0, 0);
   font-size: 60px;
    display: inline-block;
    margin-right: ${props => props.left ? '40px' : 0};
     margin-left: ${props => props.right ? '30px' : 0};
    animation: ${props => props.left ? arrowAnimationLeft : arrowAnimationRight} infinite 1s alternate ease-in-out;
`;

class Inner extends Component {


    componentWillReceiveProps(nextProps) {
        if (nextProps.isGameStarted === true && nextProps.timerStatus === 'paused') {
            this.timerProgress.style.animationPlayState = "paused";
        }
    }

    startHunting = () => {
        if (this.props.fliesTotal === 0) {
            this.props.noFliesWarning()
        } else {
            this.props.startGame();
            if (this.props.illegalHunt === true) {
                this.props.illegalHuntResolved()
            }
        }
    };

    render() {
        if (this.props.timerStatus !== 'stopped') {

            return (
                <StyledProgressInner innerRef={node => this.timerProgress = node}>
                    <StyledWrapOne>
                        <StyledWrapTwo className='flex-box'>
                            <Clock/>
                            <Score/>
                        </StyledWrapTwo>
                    </StyledWrapOne>
                </StyledProgressInner>
            )
        }

        let helper = this.props.illegalHunt === true ? 'pulse-animation start' : 'start';
        return (
            <StyledInner>
                <StyledWrapOne>
                    <StyledWrapTwo className='flex-box'>
                        <StyledArrow left>&#8687;</StyledArrow>
                        <Button text='Start hunting' helperClass={helper} handleClick={this.startHunting}/>
                        <StyledArrow right>&#8687;</StyledArrow>
                    </StyledWrapTwo>
                </StyledWrapOne>
            </StyledInner>
        )
    }
}

const InnerConnected = connect(mapStateToProps, mapDispatchToProps)(Inner);
export default InnerConnected;
