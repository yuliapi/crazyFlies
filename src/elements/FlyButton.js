import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {isGameStarted: state.timerActive};
};

const animationPulse = keyframes`
    from {
       font-size: 18px;
    }
    to {
       font-size: 26px;
    }
`;
const animationSpin = keyframes`
    from {
         transform: rotate(45deg);
     }
     to {
         transform: rotate(405deg);
     }
`;
const StyledButton = styled.button`
 display: inline-flex;
 align-items: center;
 margin: 0.5em;
 color: rgb(255, 70, 70);
 background-color: inherit;
 border: 2px solid;
 box-shadow: 1px 1px rgba(255, 70, 70, .6),
             2px 2px rgba(255, 70, 70, .6),
             3px 3px rgba(255, 70, 70, .6);
 border-radius: 3px;
 :active {
 box-shadow: inset 2px 2px rgba(255, 70, 70, .6),            
             inset 3px 3px rgba(255, 70, 70, .6);
 transform: translateX(3px);
 }
 &:disabled {
 opacity: 0.5
 }
 &:before {
   transform: rotate(45deg);
   display: inline-block;
   margin-right: 20px;
 }
 &:after {
   font-size: 18px;
   display: inline-block;
   margin-left: 20px;
   width: 70px;
   box-sizing: border-box;
 } 
 &:hover&:before {
   animation: ${animationSpin} infinite 2s linear;
 }
 &:hover&:after {
   animation: ${animationPulse} infinite 1s alternate ease-in-out;
 }
`;

class FlyButton extends Component {

    handleClick = () => {
        this.props.handleClick(this.props.speed);
    };


    render() {
        if (this.props.isGameStarted === true) {
            return <StyledButton disabled className={`${this.props.speed ? this.props.speed : ''}`}
                                 onClick={this.handleClick}>{this.props.text}</StyledButton>
        }
        return <StyledButton className={`${this.props.speed ? this.props.speed : ''}`}
                             onClick={this.handleClick}>{this.props.text}</StyledButton>
    }

}

const ConnectedFlyButton = connect(mapStateToProps, null)(FlyButton);
export default ConnectedFlyButton;
