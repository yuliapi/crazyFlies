import React, {Component} from 'react';
import styled from 'styled-components';
import uuidv1 from "uuid";
import {Transition} from 'react-transition-group'
import {connect} from "react-redux";
import {hideModal, resetGame} from "../actions";

const mapStateToProps = state => {

    return {
        modal: state.modal,
    };
};
const mapDispatchToProps = dispatch => {
    return {

        hideModal: () => dispatch(hideModal()),
        resetGame: () => dispatch(resetGame())
    };
};
const Dialog = styled.div`
  position: relative;
  outline: 0;
  width: 360px;
  height: auto;
  background: transparent;
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
opacity: inherit;
box-sizing: border-box;
  padding: 16px 8px 8px 8px
`;

const Body = styled.div`
opacity: inherit;
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
width: 50px;
height: 50px;
background-color: rgb(255,0,0);
border: 2px solid rgb(255, 255, 255);
opacity: inherit;
 &:before {
 content: '\00d7';
 color: rgb(255, 255, 255);
     font-size: 1.85em;
 }

`;

const StyledPiece = styled.div`
width: 30px;
height: 30px;
background-color: rgb(255,0,0);
float: left;
`;
const inheritOpacity = {
    opacity: 'inherit'
};

class ModalPiece extends Component {
    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    render() {
        const {in: inProp} = this.props;
        let distX = ModalPiece.getRandomArbitrary(-500, 500),
            distY = ModalPiece.getRandomArbitrary(-500, 500),
            rotY = ModalPiece.getRandomArbitrary(-720, 720),
            rotX = ModalPiece.getRandomArbitrary(-720, 720),
            z = ModalPiece.getRandomArbitrary(-500, 500);
        return (
            <Transition
                in={inProp}
                mountOnEnter={true}
                unmountOnExit={true}
                appear={true}
                addEndListener={(n, done) => {
                    if (inProp) {
                        window.TweenLite.from(n, 2, {
                            x: distX,
                            y: distY,
                            rotationX: rotX,
                            rotationY: rotY,
                            opacity: 0,
                            z: z,
                            onComplete: done
                        });
                    } else {
                        window.TweenLite.to(n, 2, {
                            x: distX,
                            y: distY,
                            rotationX: rotX,
                            rotationY: rotY,
                            opacity: 0,
                            z: z,
                            onComplete: done,
                        })
                    }
                }}>
                <StyledPiece/>
            </Transition>
        )
    }
}


class ModalDialog extends Component {
    constructor() {
        super();
        const arr = Array.apply(null, Array(60)).map(i => uuidv1());
        this.state = {
            pieces: arr
        }
    }

    handleClick = () => {
        this.props.hideModal();

    };

    render() {
        return (
            <Transition in={this.props.in}
                        appear={true}
                        mountOnEnter={true}
                        unmountOnExit={true}
                        addEndListener={(n, done) => {
                            if (this.props.in) {
                                window.TweenLite.from(n, 1, {
                                    delay: 1,
                                    opacity: 0,
                                    onComplete: done,
                                })
                            } else {
                                window.TweenLite.to(n, 1.5, {
                                    opacity: 0,
                                    onComplete: this.props.resetGame(),
                                })
                            }
                        }}>
                <Dialog className='modal-dialog'>
                    {this.state.pieces.map((e) => <ModalPiece key={e} in={this.props.in}/>)}
                    <Header>
                        <StyledButton onClick={this.handleClick} innerRef={node => this.button = node}/>
                        <h2 style={inheritOpacity}>{this.props.head}</h2>
                    </Header>
                    <Body>
                    <p style={inheritOpacity}>{this.props.text}</p>
                    </Body>
                </Dialog>
            </Transition>
        )
    }
}

const ConnectedModalDialog = connect(mapStateToProps, mapDispatchToProps)(ModalDialog);
export default ConnectedModalDialog;
