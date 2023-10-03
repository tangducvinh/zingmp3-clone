
import actionTypes from '../action/actionTypes'

const initState = {
    banner: [],
    newRelease: {},
    firstTheme: {},
    secondTheme: {},
    thirdTheme: {},
    fourthTheme: {},
    artistTheme: {},
}

const appReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_HOME: 
            return {
                ...state,
                banner: action.homeData.find(item => item.sectionId === 'hSlider').items || null,
                newRelease: action.homeData.find(item => item.sectionType === 'new-release') || null,
                firstTheme: action.homeData.find(item => item.sectionId === 'hEditorTheme') || null,
                secondTheme: action.homeData.find(item => item.sectionId === 'hEditorTheme2') || null,
                thirdTheme: action.homeData.find(item => item.sectionId === 'hEditorTheme3') || null,
                fourthTheme: action.homeData.find(item => item.sectionId === 'hEditorTheme4') || null,
                artistTheme: action.homeData.find(item => item.sectionId === 'hArtistTheme') || null,
            }
        default:
            return state
    }
}

export default appReducer