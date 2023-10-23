import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './SearchPlaylist.module.scss'
import { ItemTheme } from '../ItemTheme'

function SearchPlaylist() {
    const { dataSearch } = useSelector(state => state.music)

    return (
        <div className={clsx(styles.container)}>
            <h1 className={clsx(styles.titleName)}>Playlist/Album</h1>

            <div className={clsx(styles.wrapPlaylist)}>
                {dataSearch?.data?.data?.playlists?.map(item => (
                    <div 
                        className={clsx(styles.wrapItem)}
                        key={item.encodeId}
                    >
                        <ItemTheme item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchPlaylist