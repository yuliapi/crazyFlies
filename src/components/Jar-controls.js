import React, {Component} from 'react';
import {connect} from "react-redux";
import uuidv1 from "uuid";
import Button from '../elements/FlyButton'
import FlyCount from '../elements/FlyCount'
import {addFly, noFliesWarningDeactivate} from '../actions/index'
import {FLY_SPEED_FAST, FLY_SPEED_NORMAL, FLY_SPEED_SLOW} from "../constants/fly-constants";

const mapStateToProps = state => {
    return {warning: state.warning};
};

const mapDispatchToProps = dispatch => {
    return {
        addFly: fly => dispatch(addFly(fly)),
        noFliesWarningDeactivate: () => dispatch(noFliesWarningDeactivate())
    };
};


class JarControls extends Component {

    addNewFly = (speed) => {
        const id = uuidv1();
        this.props.addFly({id, speed});
        if (this.props.warning === true) {
            this.props.noFliesWarningDeactivate()
        }
    };
    render() {
        return (
            <div>
                <div className='nav'>
                    <ul>
                        <li>
                            <Button  text='Slow' speed={FLY_SPEED_SLOW} handleClick={this.addNewFly}/>
                            <FlyCount speed={FLY_SPEED_SLOW}/>
                        </li>
                        <li >
                            <Button text='Normal' speed={FLY_SPEED_NORMAL} handleClick={this.addNewFly}/>
                            <FlyCount speed={FLY_SPEED_NORMAL}/>
                        </li>
                        <li>
                            <Button text='Fast' speed={FLY_SPEED_FAST} handleClick={this.addNewFly}/>
                            <FlyCount speed={FLY_SPEED_FAST}/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const ConnectedJarControls = connect(mapStateToProps, mapDispatchToProps)(JarControls);
export default ConnectedJarControls;
