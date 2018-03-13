import React, {Component} from 'react';
import {connect} from "react-redux";
import {resetGame} from "../actions";
import Jar from './Jar'
import ResetButton from '../elements/Button'



const mapStateToProps = state => {
    return {isGameStarted: state.gameStarted};
};

const mapDispatchToProps = dispatch => {
    return {
        resetGame: () => dispatch(resetGame())
    };
};

class GameArea extends Component {
    reset = () => {
        this.props.resetGame()
    };
    render() {
        let reset = null;
        if (this.props.isGameStarted === true) {
            reset = <ResetButton text='Reset game' handleClick={this.reset}/>;
        }

        return (
            <div>
                <Jar/>
                {reset}
            </div>
        )
    }
}

const ConnectedGameArea = connect(mapStateToProps, mapDispatchToProps)(GameArea);
export default ConnectedGameArea
