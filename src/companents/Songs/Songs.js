import clsx from 'clsx'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Songs.module.scss'
import { SongItem } from '../SongItem'

function Songs({ data }) {
    const { isPlaying } = useSelector(state => state.play)
    const { inforCurrent, dataFavoritePlaylist } = useSelector(state => state.music)
 
    return (
        <div className={clsx(styles.container)}>
            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index < 3).map((item, index) => (
                    <div 
                        key={item.encodeId}
                    >
                        <SongItem favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} item={item} nameSizeS playing={isPlaying && inforCurrent.encodeId === item.encodeId}/>
                    </div>
                ))}
            </div>

            <div className={styles.wrapItemSong}>
                {data?.filter((item, index) => index >=3 && index < 6).map((item, index) => (
                    <div 
                        key={item.encodeId}
                    >
                        <SongItem favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} item={item} nameSizeS playing={isPlaying && inforCurrent.encodeId === item.encodeId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Songs)