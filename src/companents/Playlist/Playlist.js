import clsx from 'clsx'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import styles from './Playlist.module.scss'
import { SongItem } from '../SongItem'
import icons from '../../ultis/icon'
import * as action from '../../store/action'

function Playlist({ item, duration, total }) {
    const { RxCaretSort, BsDot } = icons
    const dispatch = useDispatch()

    function handleChosseSong(item, index) {
        dispatch(action.setCurSongId(item.encodeId, index))
        // dispatch(action.play(true))
        dispatch(action.random(false))
        dispatch(action.setChangePlaylist(true))
        dispatch(action.setSkip(false))
        dispatch(action.setRecentPlaylist(item))
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