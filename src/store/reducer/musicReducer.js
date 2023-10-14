import actionTypes from '../action/actionTypes'

const initState = {
    curSongId: null,
    indexSong: null,
    curPlaylistId: null,
}

const musicReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
                indexSong: action.index,
            }
        case actionTypes.SET_CUR_PLAYLIST_ID:
            return {
                ...state,
                curPlaylistId: action.pid || null,
            }
        default: 
            return state
    }
}

export default musicReducer