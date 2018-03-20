import React, {Component} from 'react';
import {connect} from "react-redux";
import 'normalize.css';
import './App.css';
import styled from 'styled-components';

import Header from './components/Header'
import GameArea from './components/Game-area'
import Modal from './components/Modal'
import TimerInner from './elements/TimerInner';
import uuidv1 from "uuid";


const mapStateToProps = state => {
    return {modalStatus: state.modal.show, modalType: state.modal.modalType};
};

const StyledTimer = styled.div`
 height: 60px;
 position: relative;
 width: 100%;
`;

const Loader = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100px;
height: 100px;
border: 1px solid black;
border-radius: 25px;

`


class App extends Component {
    constructor() {
        super();
        this.state ={
            loading: true
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
    }

    render() {


        let myModal;
        if (this.props.modalStatus === true) {

            myModal = <Modal type={this.props.modalType}/>
        }
        const { loading } = this.state;

        if(loading) { // if your component doesn't have to wait for an async action, remove this block
            let arr = Array.apply(null, Array(7))
            return <Loader/>; // render null when app is not ready
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


