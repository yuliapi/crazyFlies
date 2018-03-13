import React, {Component} from 'react';
import {connect} from "react-redux";
import 'normalize.css';
import './App.css';
import styled from 'styled-components';

import Header from './components/Header'
import GameArea from './components/Game-area'
import Modal from './components/Modal'
import TimerInner from './elements/TimerInner';


const mapStateToProps = state => {
    return {modal: state.modal};
};

const StyledTimer = styled.div`
 height: 60px;
 position: relative;
 width: 100%;
`;


class App extends Component {
    render() {
        let myModal;
        if (this.props.modal.show === true) {
            myModal = <Modal/>
        }
        return (
            <div className="App general-container">
                {myModal}
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

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp


