import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import appReducer from './appReducer'
import musicReducer from './musicReducer'
import playReducer from './playReducer'

const commonConfig = {
    storage: storage,
    stateReconsiler: autoMergeLevel2,
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whilelist: ['curSongId'],
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer),
    play: playReducer,
})

export default rootReducer