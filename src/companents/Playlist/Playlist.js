import clsx from 'clsx'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import styles from './Playlist.module.scss'
import { SongItem } from '../SongItem'
import icons from '../../ultis/icon'
import * as actions from '../../store/action'
import * as apis from '../../apis'

function Playlist({ item, duration, total }) {
    const { RxCaretSort, BsDot } = icons
    const dispatch = useDispatch()

    async function handleChosseSong(item, index) {
        dispatch(actions.play(false))
        dispatch(actions.load(true))
        const response = await apis.getSong(item.encodeId)
        dispatch(actions.load(false))

        if (response.data.err === 0) {
            dispatch(actions.setCurSongId(item.encodeId, index))
            dispatch(actions.setSourse(response.data.data['128']))
            dispatch(actions.setChangePlaylist(true))
        }
        else dispatch(actions.setShowVip(true))

        dispatch(actions.random(false))
        dispatch(actions.setSkip(false))
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.category)}>
                <span className={clsx(styles.songText)}>
                    <span className={clsx(styles.icon)}><RxCaretSort size={20}/></span>
                    <span>BÀI HÁT</span>
                </span>
                <span className={clsx(styles.albumText)}>ALBUM</span>
                <span className={clsx(styles.timeText)}>THỜI GIAN</span>
            </div>

            <div className={clsx(styles.content)}>
                {item?.map((item, index) => (
                    <div 
                        className={clsx(styles.songItem)}
                        onClick={() => handleChosseSong(item, index)}
                        key={item?.encodeId}
                    >
                        <SongItem item={item} icon/>
                    </div>
                ))}
            </div>

            <p className={clsx(styles.duration)}>
                <span>{`${total - 1} bài hát`}</span>
                <BsDot size={27}/>
                <span>{moment.utc(duration*1000).format(`hh:mm:ss`)}</span>
            </p>
        </div>
    )
}

export default memo(Playlist)