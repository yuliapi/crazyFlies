import {
    ADD_FLY,
    REMOVE_FLY,
    SET_TOTAL_FLIES,
    UPDATE_SCORE,
    START_GAME,
    START_TIMER,
    PAUSE_TIMER,
    ILLEGAL_HUNT_OCCUR,
    ILLEGAL_HUNT_RESOLVED,
    RESET_GAME,
    NO_FLIES_WARNING,
    NO_FLIES_WARNING_DEACTIVATE,
    ADD_POINTS_POPOVER,
    REMOVE_POINTS_POPOVER,
    SHOW_MODAL,
    HIDE_MODAL,


} from "../constants/action-types";

export const addFly = fly => ({type: ADD_FLY, payload: fly});
export const removeFly = flyId => ({type: REMOVE_FLY, payload: flyId});
export const setTotalFlies = () =>({type: SET_TOTAL_FLIES});
export const updateScore = score => ({type: UPDATE_SCORE, payload: score});
export const startGame = () => ({type: START_GAME})
export const startTimer = () => ({type: START_TIMER});
export const pauseTimer = () => ({type: PAUSE_TIMER});

export const illegalHuntOccur = () => ({type: ILLEGAL_HUNT_OCCUR});
export const illegalHuntResolved = () => ({type: ILLEGAL_HUNT_RESOLVED});
export const resetGame = () => ({type: RESET_GAME});
export const noFliesWarning = () => ({type: NO_FLIES_WARNING});
export const noFliesWarningDeactivate = () => ({type: NO_FLIES_WARNING_DEACTIVATE});
export const addPointsPopover = popover => ({type: ADD_POINTS_POPOVER, payload: popover});
export const removePointsPopover = popoverId => ({type: REMOVE_POINTS_POPOVER, payload: popoverId});

export const showModal = (modal) => ({type: SHOW_MODAL, payload: modal});
export const hideModal = (modalId) => ({type: HIDE_MODAL, payload: modalId});


// function addFly(fly) {
//     return {type: ADD_FLY, payload: fly}
// }
