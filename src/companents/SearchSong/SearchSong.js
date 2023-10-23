import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import styles from './SearchSong.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'

function SearchSong() {
    const dispatch = useDispatch()
    const { dataSearch } = useSelector(state => state.music)

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    return (
        <div className={clsx(styles.container)}>
            <h1 className={clsx(styles.titleName)}>Bài Hát</h1>

            <div className={clsx(styles.wrapSongs)}>
                {dataSearch?.data?.data?.songs?.map((item, index) => (
                    <div 
                        onClick={() => handleChooseSong(item, index)}
                        key={item.encodeId}
                    >
                        <SongItem item={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchSong