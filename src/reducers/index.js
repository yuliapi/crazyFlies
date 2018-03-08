import {
    ADD_FLY,
    REMOVE_FLY,
    UPDATE_SCORE,
    START_TIMER,
    ILLEGAL_HUNT_OCCUR,
    ILLEGAL_HUNT_RESOLVED,
    RESET_GAME,
    NO_FLIES_WARNING,
    NO_FLIES_WARNING_DEACTIVATE,
    ADD_POINTS_POPOVER,
    REMOVE_POINTS_POPOVER,
    GAME_OVER

} from '../constants/action-types'

const initialState = {
    flies: [],
    score: 0,
    timerActive: false,
    illegalHunt: false,
    warning: false,
    popovers: [],
    gameOver: false
}
;

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FLY:
            return {...state, flies: [...state.flies, action.payload]};
        case REMOVE_FLY:
            return {...state, flies: state.flies.filter(fly => fly.id !== action.payload)};
        case UPDATE_SCORE:
            return {...state, score: state.score + action.payload};
        case START_TIMER:
            return {...state, timerActive: true};
        case ILLEGAL_HUNT_OCCUR:
            return {...state, illegalHunt: true};
        case ILLEGAL_HUNT_RESOLVED:
            return {...state, illegalHunt: false};
        case NO_FLIES_WARNING:
            return {...state, warning: true};
        case NO_FLIES_WARNING_DEACTIVATE:
            return {...state, warning: false};
        case ADD_POINTS_POPOVER:
            return{...state, popovers: [...state.popovers, action.payload]};
        case REMOVE_POINTS_POPOVER:
            return {...state, popovers: state.popovers.filter(popover => popover.id !== action.payload)};
        case RESET_GAME:
            return initialState;
        default:
            return state;
    }
};

