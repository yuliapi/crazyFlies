import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";


const StyledField = styled.div`
 display: flex;
 align-items: flex-end;
 font-weight: 600
`;
const StyledSpan = styled.span`
 margin: 0 auto;
 align-self: center;
 font-size: 40px; 
 margin-left: 10px; 
 
`;
const StyledP = styled.p`
display: inline-block;
 font-size: 24px;
 line-height: 40px;

`;
const mapStateToProps = state => {

    return {score: state.score};
};

class Score extends Component {
    render() {
        return (
            <StyledField>
                <StyledP>Score:  </StyledP>
                <StyledSpan>{this.props.score}</StyledSpan>
            </StyledField>
        )
    }
}

const ScoreConnected = connect(mapStateToProps)(Score);

export default ScoreConnected;
