import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { SongItem } from '../SongItem'
import { LibrarySongEmpty } from '../LibrarySongEmpty'
import styles from './LibrarySong.module.scss'


function LibrarySong() {
    const { dataFavoritePlaylist } = useSelector(state => state.music)

    return (
        <div className={clsx(styles.container)}>
            {dataFavoritePlaylist.length === 0 ?
                <LibrarySongEmpty />
                :
                <div className={clsx(styles.content)}>
                    {dataFavoritePlaylist.map((item, index) => (
                        <div key={index}>
                            <SongItem item={item} favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} />
                        </div>
                    ))}
                </div>       
            }
        </div>
    )
}

export default LibrarySong