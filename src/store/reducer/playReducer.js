import actionTypes from '../action/actionTypes'

const initState = {
    isPlaying: false,
}

function playReducer(state = initState, action) {
    switch(action.type) {
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            }
        default:
            return state
    }
}

export default playReducer