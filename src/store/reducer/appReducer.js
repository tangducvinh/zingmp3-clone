
import actionTypes from '../action/actionTypes'

const initState = {
    banner: [],
    newRelease: [],
}

const appReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_HOME: 
            return {
                ...state,
                banner: action.homeData.find(item => item.sectionType === 'banner').items || null,
                newRelease: action.homeData.find(item => item.sectionType === 'new-release') || null,
            }
        default:
            return state
    }
}

export default appReducer