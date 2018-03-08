import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Inner from './TimerInner';

const mapStateToProps = state => {
    return {timer: state.timerActive};
};

const StyledTimer = styled.div`
 height: 60px;
 position: relative;
 width: 100%;
`;

class Timer extends Component {

    render() {
        return (
            <StyledTimer className='timer'>
                <Inner status={this.props.timer}/>
            </StyledTimer>
        )
    }

}
const TimerConnected = connect(mapStateToProps)(Timer);
export default TimerConnected;
