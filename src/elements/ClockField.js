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
	border: 1px solid whitesmoke
	
	&.lower {
	  align-items: flex-start;
	  border-top: 0.5px solid whitesmoke;
	  border-bottom-left-radius: 3px;
	  border-bottom-right-radius: 3px;
	   & > span {
	    transform: translateY(-50%)
	  }
	};
	&.upper {
	  align-items: flex-end;
	  border-bottom: 0.5px solid whitesmoke;
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
		
		animation: ${fold}, 0.6s ease-in-out;
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
		
		animation: ${unfold} 0.6s ease-in-out
		transform-style: preserve-3d
		
		& > span {
			transform: translateY(50%)
		}
  }	
`;
const StyledSpan = styled.span`

`;

class ClockField extends Component {

    render() {
        let now = this.props.data;
        let before = now === 0 ? 0 : this.props.data - 1 ;
        let digit1 = now;
        let digit2 = before;
        let animation1 = 'unfold';
        let animation2 = 'fold';
        if (this.props.shuffle === true) {
            digit1 = before;
            digit2 = now;
            animation1 = 'fold';
            animation2 = 'unfold';
        }

        return (
            <div className='clockCardWrapper'>
                <div className='clockCard' id='target'>
                    <div className='upper'>
                        <StyledSpan>{now}</StyledSpan>
                    </div>
                    <div className='lower'>
                        <StyledSpan>{before}</StyledSpan>
                    </div>
                    <div className={`flip first ${animation1}`}>
                        <StyledSpan>{digit1}</StyledSpan>
                    </div>
                    <div className={`flip second ${animation2}`}>
                        <StyledSpan>{digit2}</StyledSpan>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClockField
