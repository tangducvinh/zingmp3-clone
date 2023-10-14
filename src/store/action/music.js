import actionTypes from './actionTypes'

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
