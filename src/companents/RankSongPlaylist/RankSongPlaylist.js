import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { memo } from 'react'

import styles from './RankSongPlaylist.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'

function RankSongPlaylist({ data }) {
    const dispatch = useDispatch()

    async function handleChooseSong(item) {
        dispatch(actions.setCurrent(item.encodeId))


    }

    return (
        <div className={clsx(styles.container)}>
            {data?.map((item, index) => 
                <div 
                    className={clsx(styles.song)}
                    onClick={() => handleChooseSong(item)}
                    key={index}
                >
                    <SongItem item={item} index={index} zingchart/>
                </div>
            )}
        </div>
    )
}

export default memo(RankSongPlaylist)