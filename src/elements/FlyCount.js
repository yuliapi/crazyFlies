import React, {Component} from 'react';
import styled from 'styled-components';
import {FLY_SPEED_FAST, FLY_SPEED_NORMAL, FLY_SPEED_SLOW} from "../constants/fly-constants";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {flies: state.flies};
};

const StyledDiv = styled.div`
width: 35px;
height: 35px;
margin: 0 auto;
color: white;
background-color: ${props => props.color === 'red' ? 'red' : props.color === 'blue' ? 'blue' : 'green'};
`;
const color = {};
color[FLY_SPEED_SLOW] =  'green';
color[FLY_SPEED_NORMAL] =  'blue';
color[FLY_SPEED_FAST] =  'red';

class CounterField extends Component {
    render() {
        const myColor = color[this.props.speed];
        const count = this.props.flies.filter(fly => fly.speed === this.props.speed).length;
        return (
            <StyledDiv className='flex-box' color = {myColor}>
                <span>{count}</span>
            </StyledDiv>
        )
    }
}

const CounterFieldConnected = connect(mapStateToProps)(CounterField);

export default CounterFieldConnected;
