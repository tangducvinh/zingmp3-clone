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