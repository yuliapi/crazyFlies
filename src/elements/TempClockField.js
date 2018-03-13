import React, {Component} from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
 border: 1px solid inherit;
 display: inline-block;
 width: 25px;
 height: 40px;
 
 margin-right: 3px;
 &:last-child {
   margin-right: 0;
 }
`;
const StyledSpan = styled.span`
font-size: 36px;
font-weight: 600;
`;

class ClockField extends Component {
    render() {
        return (
            <StyledDiv>
                <StyledSpan>{this.props.data}</StyledSpan>
            </StyledDiv>
        )
    }
}
export default ClockField
