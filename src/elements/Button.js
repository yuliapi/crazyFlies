import React, {Component} from 'react';
import styled from 'styled-components';
import {START_TIMER} from "../constants/action-types";


const StyledButton = styled.button`
 height: 50px;
  padding: 10px;
  color: inherit;
  background-color: inherit;
  border: 2px solid;
  border-radius: 3px;
`;
const btnType = {};

btnType[START_TIMER] = 'btn-control';
export default class Button extends Component {

    handleClick = () => {
        this.props.handleClick()
    };

    render() {
        let helperClass = this.props.helperClass ? this.props.helperClass : '';
        return <StyledButton className={helperClass} onClick={this.handleClick}><h2>{this.props.text}</h2></StyledButton>
    }

}
