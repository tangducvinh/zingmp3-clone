import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { memo } from 'react'

import styles from './RankSongPlaylist.module.scss'
import { SongItem } from '../SongItem'

function RankSongPlaylist({ data }) {
    const { dataFavoritePlaylist } = useSelector(state => state.music)

    return (
        <div className={clsx(styles.container)}>
            {data?.map((item, index) => 
                <div 
                    className={clsx(styles.song)}
                    key={index}
                >
                    <SongItem item={item} favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} index={index} zingchart/>
                </div>
            )}
        </div>
    )
}

export default memo(RankSongPlaylist)