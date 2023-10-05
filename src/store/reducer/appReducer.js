
import actionTypes from '../action/actionTypes'

const initState = {
    banner: [],
    newRelease: {},
    theme: [],
    weekChart: [],
    rankSong: {},
}

const appReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_HOME: 
            return {
                ...state,
                banner: action.homeData.find(item => item.sectionId === 'hSlider').items || null,
                newRelease: action.homeData.find(item => item.sectionType === 'new-release') || null,
                theme: action.homeData.filter(item => item.sectionType === 'playlist'),
                weekChart: action.homeData.find(item => item.sectionType === 'weekChart').items || null,
                rankSong: action.homeData.find(item => item.sectionType === 'newReleaseChart') || null,
            }
        default:
            return state
    }
}

export default appReducer