import actionTypes from '../action/actionTypes'

const initState = {
    curSongId: null,
    indexSong: null,
    curPlaylistId: null,
    recentPlaylist: [],
    dataSearch: null,
    dataArtistSong: null,
    dataSearchPlaylist: null,
    dataZingchart: null,
    dataTop100: null,
    dataHistoryAlbums: [],
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

            state.recentPlaylist = state.recentPlaylist?.filter(item => item.encodeId !== action.data.encodeId)

            if(state.recentPlaylist.length < 20) songPlaylist = [action.data, ...state.recentPlaylist]
            else {
                state.recentPlaylist.pop()
                songPlaylist = [action.data, ...state.recentPlaylist]
            }

            return {
                ...state,
                recentPlaylist: songPlaylist
            }
        case actionTypes.SET_DATA_SEARCH:
            return {
                ...state,
                dataSearch: action.data,
            }
        case actionTypes.SET_SEARCH_SONG:
            return {
                ...state,
                dataArtistSong: action.data,
            }
        case actionTypes.SET_SEARCH_PLAYLIST:
            return {
                ...state,
                dataSearchPlaylist: action.data
            }
        case actionTypes.GET_ZINGCHART:
            return {
                ...state,
                dataZingchart: action.data,
            }
        case actionTypes.SET_DATA_TOP100:
            return {
                ...state,
                dataTop100: action.data,
            }
        case actionTypes.SET_HISTORY_ALBUMS:
            let newArray = state.dataHistoryAlbums.filter(item => item.encodeId !== action.data.encodeId)
            if(newArray.length > 7) {
                newArray.pop()
            }
            newArray = [action.data, ...newArray]

            return {
                ...state,
                dataHistoryAlbums: newArray,
            }
        default: 
            return state
    }
}

export default musicReducer