import {
    ADD_FLY,
    REMOVE_FLY,
    SET_TOTAL_FLIES,
    UPDATE_SCORE,
    START_GAME,
    START_TIMER,
    STOP_TIMER,
    ILLEGAL_HUNT_OCCUR,
    ILLEGAL_HUNT_RESOLVED,
    RESET_GAME,
    NO_FLIES_WARNING,
    NO_FLIES_WARNING_DEACTIVATE,
    ADD_POINTS_POPOVER,
    REMOVE_POINTS_POPOVER,

    SHOW_MODAL,
    HIDE_MODAL,
    PAUSE_TIMER,


} from '../constants/action-types'

import {FLY_STATUS_ALIVE} from "../constants/fly-constants";

const initialState = {

    flies: [],
    totalFlies: 0,
    score: 0,
    gameStarted: false,
    timerStatus: 'stopped',
    illegalHunt: false,
    warning: false,
    popovers: [],
    gameOver: false,
    modal: {show: false},
    completedTime: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FLY:

            return {
                ...state,
                flies: [...state.flies, {...action.payload, flyStatus: FLY_STATUS_ALIVE,}],
                totalFlies: state.totalFlies + 1
            };
        case REMOVE_FLY:
            return {...state, flies: state.flies.filter(fly => fly.id !== action.payload)};
        case SET_TOTAL_FLIES:
            console.log(state.totalFlies);
            return {...state, totalFlies: state.totalFlies - 1};
        case UPDATE_SCORE:
            return {...state, score: state.score + action.payload};
        case START_GAME:
            return {...state, gameStarted: true, timerStatus: 'started'};
        case START_TIMER:
            return {...state, timerStatus: 'started'};
        case STOP_TIMER:
            return {...state, timerStatus: 'stopped'};
        case PAUSE_TIMER:

            return {...state, timerStatus: 'paused'};
        case ILLEGAL_HUNT_OCCUR:
            return {...state, illegalHunt: true};
        case ILLEGAL_HUNT_RESOLVED:
            return {...state, illegalHunt: false};
        case NO_FLIES_WARNING:
            return {...state, warning: true};
        case NO_FLIES_WARNING_DEACTIVATE:
            return {...state, warning: false};
        case ADD_POINTS_POPOVER:
            return {...state, popovers: [...state.popovers, action.payload]};
        case REMOVE_POINTS_POPOVER:
            return {...state, popovers: state.popovers.filter(popover => popover.id !== action.payload)};
        case SHOW_MODAL:
            return {...state, modal: {...action.payload, show: true}};
        case HIDE_MODAL:
            return {...state, modal: {show: false}};

        case RESET_GAME:

            return initialState;
        default:
            return state;
    }
};

