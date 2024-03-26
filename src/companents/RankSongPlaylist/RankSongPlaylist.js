import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { memo } from 'react'

import styles from './RankSongPlaylist.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import * as apis from '../../apis'

function RankSongPlaylist({data}) {
    const dispatch = useDispatch()

    async function handleChooseSong(item, index) {
        dispatch(actions.load(true))
        const response = await apis.getSong(item.encodeId)
        dispatch(actions.load(false))

        if (response.data.err === 0) {
            dispatch(actions.setCurSongId(item.encodeId, index))
            dispatch(actions.setSourse(response.data.data['128']))
        }
        else dispatch(actions.setShowVip(true))

        dispatch(actions.setSkip(false))

    }

    return (
        <div className={clsx(styles.container)}>
            {data?.map((item, index) => 
                <div 
                    className={clsx(styles.song)}
                    onClick={() => handleChooseSong(item, index)}
                    key={index}
                >
                    <SongItem item={item} index={index} zingchart/>
                </div>
            )}
        </div>
    )
}

export default memo(RankSongPlaylist)