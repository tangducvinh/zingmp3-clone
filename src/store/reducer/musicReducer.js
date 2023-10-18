import actionTypes from '../action/actionTypes'

const initState = {
    curSongId: null,
    indexSong: null,
    curPlaylistId: null,
    recentPlaylist: [],
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
        case actionTypes.SET_RECENT_PLAYLIST:
            let songPlaylist

            state.recentPlaylist = state.recentPlaylist.filter(item => item.encodeId !== action.data.encodeId)

            if(state.recentPlaylist.length < 30) songPlaylist = [action.data, ...state.recentPlaylist]
            else {
                state.recentPlaylist.pop()
                songPlaylist = [action.data, ...state.recentPlaylist]
            }

            return {
                ...state,
                recentPlaylist: songPlaylist
            }
        default: 
            return state
    }
}

export default musicReducer