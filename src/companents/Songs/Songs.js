import clsx from 'clsx'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Songs.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'

function Songs({ data }) {
    const { isPlaying } = useSelector(state => state.play)
    const { inforCurrent } = useSelector(state => state.music)
    const dispatch = useDispatch()

    async function handleChooseSong(data) {
        dispatch(actions.setCurrent(data.encodeId))

        // dispatch(actions.setSkip(false))
        
        if (data.encodeId === inforCurrent.encodeId && isPlaying) dispatch(actions.play(false))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index < 3).map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={item.encodeId}
                    >
                        <SongItem item={item} nameSizeS playing={isPlaying && inforCurrent.encodeId === item.encodeId}/>
                    </div>
                ))}
            </div>

            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index >=3 && index < 6).map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={item.encodeId}
                    >
                        <SongItem item={item} nameSizeS playing={isPlaying && inforCurrent.encodeId === item.encodeId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Songs)