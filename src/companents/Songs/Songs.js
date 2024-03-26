import clsx from 'clsx'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Songs.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import * as apis from '../../apis'

function Songs({ data }) {
    const { isPlaying } = useSelector(state => state.play)
    const { curSongId } = useSelector(state => state.music)
    const dispatch = useDispatch()

    async function handleChooseSong(data) {
        dispatch(actions.load(true))
        const response = await apis.getSong(data.encodeId)
        dispatch(actions.load(false))

        if (response.data.err === 0) {
            dispatch(actions.setCurSongId(data.encodeId, 0))
            dispatch(actions.setSourse(response.data.data['128']))
        }
        else dispatch(actions.setShowVip(true))

        dispatch(actions.setSkip(false))
        dispatch(actions.setRecentPlaylist(data))
        
        if (data.encodeId === curSongId && isPlaying) dispatch(actions.play(false))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index < 3).map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={item.encodeId}
                    >
                        <SongItem item={item} nameSizeS playing={isPlaying && curSongId === item.encodeId}/>
                    </div>
                ))}
            </div>

            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index >=3 && index < 6).map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={item.encodeId}
                    >
                        <SongItem item={item} nameSizeS playing={isPlaying && curSongId === item.encodeId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Songs)