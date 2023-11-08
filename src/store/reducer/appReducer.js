import actionTypes from '../action/actionTypes'

const initState = {
    banner: [],
    newRelease: {},
    theme: null,
    weekChart: [],
    rankSong: {},
    songChart: {},
    dataHistoryKeyword: [],
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
        case actionTypes.SET_HISTORY_KEYWORD:
            let newData = state.dataHistoryKeyword.filter(item => item !== action.keyword)

            if (newData.length > 4) {
                newData.pop()
            }
            newData = [action.keyword, ...newData]

            return {
                ...state,
                dataHistoryKeyword: newData,
            }
        default:
            return state
    }
}

export default appReducer