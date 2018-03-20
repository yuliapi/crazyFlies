import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {connect} from 'react-redux';
import uuidv1 from "uuid";
import ReactAnimationFrame from 'react-animation-frame';
import {removeFly, updateScore, illegalHuntOccur, addPointsPopover, setTotalFlies} from "../actions";
import {
    FLY_SPEED_FAST,
    FLY_SPEED_NORMAL,
    FLY_SPEED_SLOW,
    SLOW_SCORE,
    NORMAL_SCORE,
    FAST_SCORE,
    JAR_HEIGHT,
    FLY_HEIGHT,
    FLY_WIDTH, JAR_WIDTH
} from "../constants/fly-constants";
import Victor from 'victor';

import imageFlyRed from '../images/fly.png';
import imageFlyGreen from '../images/fly-green.png';
import imageFlyBlue from '../images/fly-blue.png';
import imageSplat from '../images/splat.png';
import imageTarget from '../images/target30.png'

window.Victor = Victor;


const mapStateToProps = state => {
    return {flies: state.flies, timerStatus: state.timerStatus};
};
const mapDispatchToProps = dispatch => {
    return {
        setTotalFlies: () => dispatch(setTotalFlies()),
        removeFly: flyId => dispatch(removeFly(flyId)),
        updateScore: score => dispatch(updateScore(score)),
        illegalHuntOccur: () => dispatch(illegalHuntOccur()),
        addPointsPopover: popover => dispatch(addPointsPopover(popover)),


    };
};


const StyledFly = styled.span`
    content: ${props => props.speed === FLY_SPEED_FAST ? `url(${imageFlyRed})` :
    props.speed === FLY_SPEED_SLOW ? `url(${imageFlyGreen})` : `url(${imageFlyBlue})`};
    display: inline-block;
    position: absolute;
    left: ${props => props.position.left}px;
    bottom: ${props => props.position.bottom}px;
     transform:${props => props.rotate};
    width: ${FLY_WIDTH}px;
    height: ${FLY_HEIGHT}px;
    z-index: 200;
    cursor: url(${imageTarget}), auto;
    transform-origin: bottom center;
`;
const fade = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const speedBuckets = {};
speedBuckets[FLY_SPEED_SLOW] = 1;
speedBuckets[FLY_SPEED_NORMAL] = 8;
speedBuckets[FLY_SPEED_FAST] = 15;

const scoreCounter = {};
scoreCounter[FLY_SPEED_SLOW] = SLOW_SCORE;
scoreCounter[FLY_SPEED_NORMAL] = NORMAL_SCORE;
scoreCounter[FLY_SPEED_FAST] = FAST_SCORE;

const StyledSplat = styled.span`
 content: url(${imageSplat});
    display: inline-block;
    position: absolute;
    left: ${props => props.position.left}px;
    bottom: ${props => props.position.bottom}px;
   
    width: 40px;
    height: 40px;
    animation: ${fade} 1.5s ease-in-out;
    z-index: 200;
`;

class Fly extends Component {
    constructor(props) {
        super();
        // let initX = 130;
        // let initY = 70;
        let initX = Math.floor(Math.random() * Math.floor(260));
        let initY = Math.floor(Math.random() * Math.floor(150));
        this.state = {
            flyType: props.speed,
            initPosX: initX,
            initPosY: initY,
            pathData: Fly.generateRandomPathData(props.speed),
            alive: true
        }
    }

    stop = (e) => {
        e.stopPropagation();
        if (this.props.timerStatus === 'started') {
            this.props.setTotalFlies();
            this.props.endAnimation();
            let coordX = Fly.cutString(this.flySpan.style.left);
            let coordY = Fly.cutString(this.flySpan.style.bottom);
            this.setState({
                pathData: {n: 0, d: 0, speed: 0, direction: 0}, alive: false, initPosX: coordX, initPosY: coordY,
            });

            const id = uuidv1();
            let coordYAdj = JAR_HEIGHT - coordY - FLY_HEIGHT;
            this.props.addPointsPopover({
                id,
                coordX: coordX,
                coordY: coordYAdj,
                score: `+${scoreCounter[this.state.flyType]}`
            });
            this.props.updateScore(scoreCounter[this.state.flyType]);

        } else {
            this.props.illegalHuntOccur()
        }

    };

    static cutString(str) {
        const cut = str.length - 2;
        return str.substr(0, cut);
    }

    static generateRandomPathData(type) {
        let n = Math.floor(Math.random() * 7) + 1;
        let d = Math.floor(Math.random() * 7) + 1;
        if (d === n) {
            d = d + 1
        }
        let lowSpeed = 0.00005 * speedBuckets[type];
        let highSpeed = 0.0001 * speedBuckets[type];

        let speed = (Math.random() * highSpeed + lowSpeed);
        let direction = Math.random() < 0.5 ? -1 : 1;

        return {'n': n, 'd': d, 'speed': speed, 'direction': direction}
    }

    static isInBounds(x, y) {
        let left = 0;
        let right = JAR_WIDTH - 2*FLY_WIDTH ;
        let bottom = FLY_HEIGHT/2;
        let top = JAR_HEIGHT - FLY_HEIGHT;
        let inBounds = true;
        if (Math.round(x) < left || Math.round(x) > right || Math.round(y) > top || Math.round(y) < bottom) {
            inBounds = false
        }
        return inBounds
    }


    static path(theta, data, amplitude) {
        let k = data.pathData.n / data.pathData.d;
        let x = (amplitude * Math.cos(k * theta) * Math.cos(theta)) * data.pathData.direction + data.initPosX;
        let y = amplitude * Math.cos(k * theta) * Math.sin(theta) + data.initPosY;
        return {"x": x, "y": y};
    }

    static adjustAngle(theta, path) {
        const k = path.n / path.d;
        const a = -k * Math.sin(k * theta) * Math.sin(theta) + Math.cos(k * theta) * Math.cos(theta);
        const b = -k * Math.sin(k * theta) * Math.cos(theta) - Math.cos(k * theta) * Math.sin(theta);
        return (Math.atan(a / b));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    onAnimationFrame(time) {
        let theta = this.state.pathData.speed * time;
        let p = Fly.path(theta, this.state, 100.0);
        if (Fly.isInBounds(p.x, p.y) === false) {
            this.setState({pathData: Fly.generateRandomPathData(this.state.flyType)});
        } else {
            let coordX = Fly.cutString(this.flySpan.style.left);
            let coordY = Fly.cutString(this.flySpan.style.bottom);
            const prev = new Victor(coordX, coordY);
            const next = new Victor(p.x, p.y);

            const slope = next.subtract(prev).verticalAngle()*1.1;
            // console.log(slope);

            // let slope = (n/ext.verticalAngle());
            this.flySpan.style.transform = `rotate(${slope}rad)`;
            this.flySpan.style.left = `${p.x}px`;
            this.flySpan.style.bottom = `${p.y}px`;


        }
    }


    render() {

        if (this.state.killed === true) {
            return (null);
        }
        if (this.state.alive === true) {
            let angle = this.state.pathData.direction === -1 ? 'rotate(0deg)' : 'rotate(0deg)';
            return <StyledFly data-area="fly" rotate={angle} speed={this.state.flyType}
                              position={{left: this.state.initPosX, bottom: this.state.initPosY}} onClick={this.stop}
                              innerRef={node => this.flySpan = node}
            />
        }
        return <StyledSplat position={{left: this.state.initPosX, bottom: this.state.initPosY}}
                            onAnimationEnd={() => {
                                this.setState({killed: true});
                                this.props.removeFly(this.props.id);
                            }
                            }
                            innerRef={node => this.flySpan = node}/>
    }
}

const FlyConnected = connect(mapStateToProps, mapDispatchToProps)(ReactAnimationFrame(Fly));

export default FlyConnected;
