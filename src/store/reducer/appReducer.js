
import actionTypes from '../action/actionTypes'

const initState = {
    banner: [],
    newRelease: {},
    theme: [],
    weekChart: [],
    rankSong: {},
    songChart: {},
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
                songChart: action.homeData.find(item => item.sectionId === "hZC") || null,
            }
        default:
            return state
    }
}

export default appReducer