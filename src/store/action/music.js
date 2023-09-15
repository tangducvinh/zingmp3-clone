import actionTypes from './actionTypes'

export function setCurSongId(sid) {
    return {
        type: actionTypes.SET_CUR_SONG_ID,
        sid,
    }
}

export function play(flag) {
    return {
        type: actionTypes.PLAY,
        flag,
    }
}