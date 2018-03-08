import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {removePointsPopover} from "../actions";
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        removePopover: popoverId => dispatch(removePointsPopover(popoverId)),
    };
};


const AnimatedPopover = keyframes`
  from {
  transform: translateY(0);
    opacity: 1;
  }
  to {
  transform: translateY(-15px);
    opacity: 0;
  }
`;
const StyledSpan = styled.span`
position: absolute;
left: ${props => props.left}px;
top: ${props => props.top}px;
color: rgb(255, 0, 0);
animation: ${AnimatedPopover} 1.5s ease-out;
`;

class Popup extends Component {
    render() {
        const left = this.props.posX;
        const top = this.props.posY - 10;
        return (
            <StyledSpan left={left} top={top} onAnimationEnd={() => {
                this.props.removePopover(this.props.id);
            }
            }>{this.props.score} </StyledSpan>
        );
    }
}

const ConnectedPopup = connect(null, mapDispatchToProps)(Popup)
export default ConnectedPopup;
