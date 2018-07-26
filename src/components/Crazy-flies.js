import React, {Component} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';

import Header from './Header'
import GameArea from './Game-area'
import Modal from './Modal'
import TimerInner from '../elements/TimerInner';
import {TransitionGroup} from 'react-transition-group';

import { Link } from 'react-router-dom'


const mapStateToProps = state => {
    return {modalStatus: state.modal.show, modalType: state.modal.modalType};
};

const StyledTimer = styled.div`
 height: 60px;
 position: relative;
 width: 100%;
`;

class CrazyFlies extends Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }


    render() {


        return (

            <div className="App general-container">

                <TransitionGroup>
                    {this.props.modalStatus === true ? <Modal type={this.props.modalType}/> : null}
                </TransitionGroup>
                <header className="header">
                    <Header/>
                </header>
                <StyledTimer className='timer'>
                    <TimerInner/>
                </StyledTimer>
                <div className='content'>
                    <div className='jar-container'>
                        <GameArea/>
                    </div>
                    <div className='score-container'>
                    </div>
                </div>
            </div>

        );
    }
}

const ConnectedGame = connect(mapStateToProps, null)(CrazyFlies);
export default ConnectedGame