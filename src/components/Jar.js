import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from "react-redux";
import uuidv1 from "uuid";
import Fly from '../elements/Fly'
import Popover from '../elements/PointsPopup'
import {updateScore, addPointsPopover, illegalHuntOccur, showModal, pauseTimer} from "../actions";

import {FALSE_CLICK_SCORE, JAR_HEIGHT, JAR_WIDTH} from "../constants/fly-constants";
import jarImage from '../images/jar.png'

const mapStateToProps = state => {
    return {
        flies: state.flies,
        totalFlies: state.totalFlies,
        popovers: state.popovers,
        warning: state.warning,
        isGameStarted: state.gameStarted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPointsPopover: popover => {
            dispatch(addPointsPopover(popover))
        },
        updateScore: score => dispatch(updateScore(score)),
        illegalHuntOccur: () => dispatch(illegalHuntOccur()),
        showModal: (modal) => dispatch(showModal(modal)),
        pauseTimer: () => dispatch(pauseTimer()),


    };
};
const JarWrapper = styled.div`
  position: relative;
width: calc(${JAR_WIDTH}px + 40px);
  height: calc(${JAR_HEIGHT}px + 20px);
  margin: 10px auto;
  background-image: url(${jarImage});
  background-size: auto;
  background-repeat: no-repeat;
  background-size: contain;
  
`;

const MyJar = styled.div`
 width: ${JAR_WIDTH}px;
  height: ${JAR_HEIGHT}px;
  
     border-bottom-left-radius: 75px;
    position: relative;
   top: -10px;
  z-index: 0;
  
`;
const flashingText = keyframes`
  from {box-shadow: 0 0 0 0 white;}

  to {box-shadow: 0 0 50px 15px rgb(255, 0, 0);}
`;
const Warning = styled.div`
 color: rgb(255, 0, 0);
  animation:  ${flashingText} infinite 1s alternate linear;
border-color: white;
`;

class Jar extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isGameStarted === true && nextProps.totalFlies === 0) {
            this.props.pauseTimer();

            this.props.showModal({modalType: 'aheadOfTime'});
        }
    }

    jarOnClick = (e) => {
        if (this.props.isGameStarted === true) {
            let coordX = e.nativeEvent.offsetX;
            let coordY = e.nativeEvent.offsetY;
            const id = uuidv1();
            this.props.addPointsPopover({id, coordX, coordY, score: FALSE_CLICK_SCORE});
            this.props.updateScore(FALSE_CLICK_SCORE);
        } else {
            this.props.illegalHuntOccur()
        }
    };

    render() {

        if (this.props.warning === true) {
            return (
                <JarWrapper>
                    <MyJar className='jar flex-box' onClick={this.jarOnClick}>
                        <Warning>
                            <h2>You have no flies to hunt.</h2>
                            <h2>Add them!!!</h2>
                        </Warning>
                    </MyJar>
                </JarWrapper>
            )
        }
        let flies = this.props.flies;
        let popovers = this.props.popovers;
        return (
            <JarWrapper>
                <MyJar className='jar' onClick={this.jarOnClick}>
                    {popovers.map(popover => (
                        <Popover key={popover.id} id={popover.id} posX={popover.coordX} posY={popover.coordY}
                                 score={popover.score}/>
                    ))}
                    {flies.map(fly => (
                        <Fly key={fly.id} id={fly.id} speed={fly.speed}/>
                    ))}
                </MyJar>
            </JarWrapper>
        )
    }
}

const ConnectedJar = connect(mapStateToProps, mapDispatchToProps)(Jar);
export default ConnectedJar
