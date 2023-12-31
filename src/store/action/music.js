import actionTypes from './actionTypes'

import * as apis from '../../apis'

export function setCurSongId(sid, index) {
    return {
        type: actionTypes.SET_CUR_SONG_ID,
        sid,
        index,
    }
}

export function play(flag) {
    return {
        type: actionTypes.PLAY,
        flag,
    }
}

export function random(flag) {
    return {
        type: actionTypes.RANDOM,
        flag,
    }
}

export function repeat(flag) {
    return {
        type: actionTypes.REPEAT,
        flag,
    }
}

export function checkVip(flag) {
    return {
        type: actionTypes.CHECKVIP,
        flag,
    }
}

export function load(flag) {
    return {
        type: actionTypes.LOAD,
        flag,
    }
}

export function sidebarRight(flag) {
    return {
        type: actionTypes.STATUS_SIDEBAR_RIGHT,
        flag,
    }
}

export function setCurPlaylistId(pid) {
    return {
        type: actionTypes.SET_CUR_PLAYLIST_ID,
        pid,
    }
}

export function setChangePlaylist(flag) {
    return {
        type: actionTypes.SET_CHANGE_PLAYLIST,
        flag,
    }
}

export function setRecentPlaylist(data) {
    return {
        type: actionTypes.SET_RECENT_PLAYLIST,
        data,
    }
}

export function setDataSearch(data) {
    return {
        type: actionTypes.SET_DATA_SEARCH,
        data,
    }
}

export function getSearchSong(id) {
    return async function(dispatch) {
        dispatch({type: actionTypes.SET_LOADING_SEARCH_SONG, flag: true})
        const response = await apis.getArtistSong(id)
        dispatch({type: actionTypes.SET_LOADING_SEARCH_SONG, flag: false})
        if (response.data.err === 0) {
            dispatch({type: actionTypes.SET_SEARCH_SONG, data: response.data.data.items})
        } else {
            dispatch({type: actionTypes.SET_SEARCH_SONG, data: null})
        }
    }
}

export function getSearchPlaylist(alias) {
    return async function(dispatch) {
        dispatch({type: actionTypes.SET_LOADING_SEARCH_PLAYLIST, flag: true})
        const response = await apis.getArtist(alias)
        dispatch({type: actionTypes.SET_LOADING_SEARCH_PLAYLIST, flag: false})
        if (response.data.err === 0) {
            dispatch({type: actionTypes.SET_SEARCH_PLAYLIST, data: response.data.data.sections[1].items})
        } else {
            dispatch({type: actionTypes.SET_SEARCH_PLAYLIST, data: null})
        }
    }
}

export function getDataZingchart() {
    return async function(dispatch) {
        dispatch({type: actionTypes.SET_LOADING_ZINGCHART, flag: true})
        const response = await apis.getZingchart()
        dispatch({type: actionTypes.SET_LOADING_ZINGCHART, flag: false})

        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ZINGCHART,
                data: response.data.data,
            })
        } else {
            dispatch({
                type: actionTypes.GET_ZINGCHART,
                data: null,
            })
        }
    }
}

export function getDataTop100() {
    return async function(dispatch) {
        const response = await apis.getTop100()
        if (response.data.err === 0) {
            dispatch({
                type: actionTypes.SET_DATA_TOP100,
                data: response.data.data,
            })
        } else {
            dispatch({
                type: actionTypes.SET_DATA_TOP100,
                data: null,
            })
        }
    }
}

export function setDataHistoryAlbums(data) {
    return {
        type: actionTypes.SET_HISTORY_ALBUMS,
        data,
    }
}

export function setLoadingSearch(flag) {
    return {
        type: actionTypes.SET_LOADING_SEARCH,
        flag,
    }
}

export function setShowVip(flag) {
    return {
        type: actionTypes.SET_SHOW_VIP,
        flag,
    }
}

export function setRepeat(flag) {
    return {
        type: actionTypes.SET_REPEAT,
        flag
    }
}

export function setSkip(flag) {
    return {
        type: actionTypes.SET_SKIP,
        flag
    }
}
