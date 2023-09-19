import clsx from 'clsx'
import { memo } from 'react'

import styles from './Playlist.module.scss'
import { SongItem } from '../SongItem'
import icons from '../../ultis/icon'

function Playlist({ item, duration }) {
    const { RxCaretSort } = icons

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
                {item?.map(item => <SongItem key={item.encodeId} item={item} />)}
            </div>
        </div>
    )
}

export default memo(Playlist)