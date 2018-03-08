import React, {Component} from 'react';
import styled, {keyframes} from 'styled-components';

const fold = keyframes`
  from {
        transform: rotateX(0deg);
    }
    to {
       transform: rotateX(180deg);;
    }
`;
const unfold = keyframes`
  from {
        transform: rotateX(180deg);
    }
    to {
       transform: rotateX(0deg);;
    }
`;


const StyledDiv = styled.div`
 display: block;
 position: relative;
  width: 30px;
 height: 40px;
 perspective-origin: 50% 50%;
 perspective: 80px;
 margin-right: 2px;
 
 border-radius: 3px;
 &:nth-child(2){
   margin-right: 10px;
 }
 &:last-child {
   margin-right: 0;
 }
`;
const StyledStaticCard = styled.div`
	display: flex;
	position: relative;
	justify-content: center;
	width: 100%;
	height: 50%;
	overflow: hidden;
	border: 1px solid rgb(255, 0, 0);
	
	&.lower {
	  align-items: flex-start;
	  border-top: 0.5px solid inherit;
	  border-bottom-left-radius: 3px;
	  border-bottom-right-radius: 3px;
	   & > span {
	    transform: translateY(-50%)
	  }
	};
	&.upper {
	  align-items: flex-end;
	  border-bottom: 0.5px solid inherit;
	  border-top-left-radius: 3px;
	  border-top-right-radius: 3px;
	  & > span {
	    transform: translateY(50%)
	  }
	}
`;
const StyledAnimatedCard = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 30px;
  height: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  &.unfold {
		top: 50%;
		align-items: flex-start;
		transform-origin: 50% 0%;
		transform: rotateX(180deg); 
		
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		border: 1px solid inherit;
		border-top: 0.5px solid inherit;
		
		animation: ${fold}, $easeInOut, 0.6s;
		transform-style: preserve-3d
		& > span {
			transform: translateY(-50%
		}
  }
  &.fold {
		top: 0%;
		align-items: flex-end;
		transform-origin: 50% 100%;
		transform: rotateX(0deg);
		
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border: 0.5px solid inherit;
		border-bottom: 0.5px solid inherit;
		
		animation: ${unfold}, $easeInOut, 0.6s;
		transform-style: preserve-3d
		
		& > span {
			transform: translateY(50%)
		}
  }	
`;
const StyledSpan = styled.span`
 font-size: 36px;
 font-weight: 600;
 margin: 0 auto;
`;

class ClockField extends Component {
    render() {
        let now = this.props.data
        let before = this.props.data - 1;
        return (
            <StyledDiv>
                <StyledStaticCard className = 'lower'>
                    <StyledSpan>{now}</StyledSpan>
                </StyledStaticCard>
                <StyledStaticCard className = 'upper'>
                    <StyledSpan>{before}</StyledSpan>
                </StyledStaticCard>
                {/*<StyledAnimatedCard className = 'first'>*/}
                    {/*<StyledSpan>{before}</StyledSpan>*/}
                {/*</StyledAnimatedCard>*/}
                {/*<StyledAnimatedCard className = 'second'>*/}
                    {/*<StyledSpan>{now}</StyledSpan>*/}
                {/*</StyledAnimatedCard>*/}
            </StyledDiv>


        )
    }
}

export default ClockField
