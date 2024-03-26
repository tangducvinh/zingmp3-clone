import actionTypes from '../action/actionTypes'

const initState = {
    curSongId: null,
    curSourse: null,
    indexSong: null,
    curPlaylistId: null,
    recentPlaylist: [],
    historyPlaylist: [],
    dataSearch: null,
    dataArtistSong: null,
    dataSearchPlaylist: null,
    dataZingchart: null,
    dataTop100: null,
    dataHistoryAlbums: [],
    dataNextSong: [],
}

const musicReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null,
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
        case actionTypes.SET_SOURSE:
            return {
                ...state,
                curSourse: action.data
            }
        case actionTypes.ADD_HISTORY_PLAYLIST:

            const newData = [...state.historyPlaylist]

            if (state.historyPlaylist >= 20) {
                newData.pop();
            }

            newData.push(action.data)

            return {
                ...state,
                historyPlaylist: newData
            }
        case actionTypes.DELETE_HISTORY_PLAYLIST: 
            const copyData = [...state.historyPlaylist]
            copyData.pop()
            copyData.pop()

            return {
                ...state,
                historyPlaylist: copyData,
            }
        case actionTypes.SET_DATA_NEXT_SONGS:
            return {
                ...state,
                dataNextSong: action.data
            }
        default: 
            return state
    }
}

export default musicReducer