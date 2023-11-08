import actionTypes from './actionTypes'
import * as apis from '../../apis/home'

export function getHome() {
    return async function(dispatch) {
        try {
            const response = await apis.getHome()
            if (response.data.err === 0) {
                dispatch({
                    type: actionTypes.GET_HOME,
                    homeData: response.data.data.items,
                })
            } else {
                dispatch({
                    type: actionTypes.GET_HOME,
                    homeData: null,
                })
            }
        } catch(error) {

        }
    }
}

export function setHistoryKeyword(keyword) {
    return {
        type: actionTypes.SET_HISTORY_KEYWORD,
        keyword,
    }
}