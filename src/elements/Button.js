import React, {Component} from 'react';
import styled from 'styled-components';



const StyledButton = styled.button`
 height: 50px;
 width: 175px;
  padding: 10px;
  color: inherit;
  background-color: inherit;
  border: 2px solid;
  border-radius: 3px;
  cursor: pointer;
  & > span {
  font-size: 1.5em;
  font-weight: bold;
  }
  &:hover > span {
font-size: 1.3em;
  }
`;

export default class Button extends Component {

    handleClick = () => {
        this.props.handleClick()
    };

    render() {
        let cl = this.props.helperClass ? this.props.helperClass : '';
        return <StyledButton className={cl} onClick={this.handleClick}><span>{this.props.text}</span></StyledButton>
    }

}
