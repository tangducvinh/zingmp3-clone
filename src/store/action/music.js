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