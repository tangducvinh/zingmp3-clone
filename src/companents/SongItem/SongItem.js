import clsx from 'clsx'
import styles from './SongItem.module.scss'
import { memo } from 'react'
import moment from 'moment'

import { InforSong } from '../InforSong'
import icons from '../../ultis/icon'

function SongItem({item}) {
    const { LuMusic } = icons
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.inforItem)}>
                <span className={clsx(styles.icon)}><LuMusic size={16}/></span>
                <InforSong 
                    item={item}
                    sizeM
                />
            </div>

            <a href='' className={clsx(styles.name)}>
                {item?.album?.title.length > 30 ? 
                `${item?.album?.title.slice(0, 30)}...` :
                item?.album?.title}
            </a>

            <span className={clsx(styles.duration)}>{moment(item.duration * 1000).format('mm:ss')}</span>
        </div>
    )
}

export default memo(SongItem)