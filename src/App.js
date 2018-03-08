import React, {Component} from 'react';
import {connect} from "react-redux";
import 'normalize.css';
import './App.css';

import Header from './components/Header'
import Timer from './elements/Timer.js';
import GameArea from './components/Game-area'


const mapStateToProps = state => {

    return {isTimerActive: state.timerActive};
};

class App extends Component {
    render() {

        return (
            <div className="App general-container">
                <header className="header">
                    <Header/>
                </header>
                <Timer/>
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


