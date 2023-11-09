import actionTypes from '../action/actionTypes'

const initState = {
    isPlaying: false,
    isRandom: false,
    isVip: false,
    isLoad: false,
    sidebarRight: false,
    isChangePlaylist: true,
    loadingSearch: false,
    isShowVip: false,
    isRepeat: false,
    isSkip: true,
}

function playReducer(state = initState, action) {
    switch(action.type) {
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag,
            }
        case actionTypes.RANDOM:
            return {
                ...state,
                isRandom: action.flag,
            }
        case actionTypes.CHECKVIP:
            return {
                ...state,
                isVip: action.flag,
            }
        case actionTypes.LOAD:
            return {
                ...state,
                isLoad: action.flag,
            }
        case actionTypes.STATUS_SIDEBAR_RIGHT:
            return {
                ...state,
                sidebarRight: action.flag,
            }
        case actionTypes.SET_CHANGE_PLAYLIST:
            return {
                ...state,
                isChangePlaylist: action.flag,
            }
        case actionTypes.SET_LOADING_SEARCH:
            return {
                ...state,
                loadingSearch: action.flag,
            }
        case actionTypes.SET_SHOW_VIP:
            return {
                ...state,
                isShowVip: action.flag
            }
        case actionTypes.SET_REPEAT:
            return {
                ...state,
                isRepeat: action.flag,
            }
        case actionTypes.SET_SKIP:
            return {
                ...state,
                isSkip: action.flag
            }
        default:
            return state
    }
}

export default playReducer