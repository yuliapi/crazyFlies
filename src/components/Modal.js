import React, {Component} from 'react';
import styled from 'styled-components';
import uuidv1 from "uuid";
// import {CSSTransition, TransitionGroup} from 'react-transition-group'
// import TweenLite from 'gsap/TweenLite';
import {connect} from "react-redux";
import {hideModal, resetGame} from "../actions";


const mapDispatchToProps = dispatch => {
    return {

        hideModal: () => dispatch(hideModal()),

        resetGame: () => dispatch(resetGame())
    };
};
const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .65);
`;

const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  text-align: center;
  overflow-scrolling: touch;
  padding: 4px;
  cursor: pointer;

  &:after {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    margin-left: -.05em;
    content: '';
  }
`;

const Dialog = styled.div`
  position: relative;
  outline: 0;
  width: 360px;
  height: auto;
  background: white;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;

  cursor: default;
`;

const Header = styled.div`
position: absolute;
top:0;
left: 0;
width: 100%;
box-sizing: border-box;
  padding: 16px 8px 8px 8px
`;

const Body = styled.div`

  width: 100%;
  position: absolute;
  top: 50%;
  left:0;
  
`;

const StyledButton = styled.button`
position: absolute;
top: 0;
right: 0;
margin: 5px;
width: 25px;
height: 25px;
 &:before {
 content: '\00d7'
 }
`;
const StyledPiece = styled.div`
width: 30px;
height: 30px;
background-color: rgba(95,144,222,0.5);
float: left;
`;

class ModalPiece extends Component {
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    render() {
        // const distX = ModalPiece.getRandomArbitrary(-500, 500),
        //     distY = ModalPiece.getRandomArbitrary(-250, 250),
        //     rotY = ModalPiece.getRandomArbitrary(-720, 720),
        //     rotX = ModalPiece.getRandomArbitrary(-720, 720),
        //     z = ModalPiece.getRandomArbitrary(-500, 500);
        return <StyledPiece/>

    }

}

class Modal extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         shouldShow: true
    //     };
    //     setInterval(() => {
    //         this.setState({ shouldShow: !this.state.shouldShow })
    //     }, 5000)
    // }
    //

    handleClick = () => {

        this.props.hideModal();
        this.props.resetGame()
    };


    render() {
        let paragraph;
        let head;
        if (this.props.type === 'aheadOfTime') {
            head = <h2>Well done!!!</h2>;
            paragraph =
                <p>You've killed them all ahead of time. Next time challenge yourself with more and faster flies. </p>
        } else {
            head = <h2>Sorry, time is out.</h2>;
            paragraph = <p>It was a nice try!</p>;
        }
        let arr = Array.apply(null, Array(60)).map(i => uuidv1());

        return (

            <div className='modal'>
                <Overlay/>
                <Content>
                    <Dialog>
                        {arr.map((e) => (<ModalPiece key={e}/>))}
                        <Header>
                            <StyledButton onClick={this.handleClick}/>
                            {head}
                        </Header>

                        <Body ref={body => this.container = body}>
                        {paragraph}
                        </Body>

                    </Dialog>}

                </Content>
            </div>

        );
    }

}

const ConnectedModal = connect(null, mapDispatchToProps)(Modal);
export default ConnectedModal;
