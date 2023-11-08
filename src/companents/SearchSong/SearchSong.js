import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, memo } from 'react'

import styles from './SearchSong.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import { LibrarySongEmpty } from '../LibrarySongEmpty' 

function SearchSong({data, hide}) {
    const dispatch = useDispatch()
    const { dataSearch } = useSelector(state => state.music)

    useEffect(() => {
        dispatch(actions.getSearchSong(dataSearch?.data?.data?.artists[0]?.id))
    }, [dataSearch])

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    return (
        <div className={clsx(styles.container)}>
            {!hide && <h1 className={clsx(styles.titleName)}>Bài Hát</h1>}

            {data?.length >= 1 ?
                <div className={clsx(styles.wrapSongs)}>
                    {data?.map((item, index) => (
                        <div 
                            onClick={() => handleChooseSong(item, index)}
                            key={item.encodeId}
                        >
                            <SongItem item={item}/>
                        </div>
                    ))}
                </div> 
                :
                <LibrarySongEmpty />
            }
        </div>
    )
}

export default memo(SearchSong)