import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import styles from './SearchAll.module.scss'
import { ItemTheme } from '../ItemTheme'
import { LinkAll } from '../LinkAll'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import { ItemArtist } from '../ItemArtist'
import path from '../../ultis/path'

function SearchAll() {
    const { dataSearch } = useSelector(state => state.music)
    const dispatch = useDispatch()

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    return (
        <div clsx={clsx(styles.container)}>
            <div className={clsx(styles.songs)}>
                <div className={clsx(styles.wrapTitle)}>
                    <h2 className={clsx(styles.titleName)}>Bài Hát</h2>

                    <LinkAll path={`/${path.SEARCH}${path.SONG}`}/>
                </div>

                <div className={clsx(styles.wrapSongs)}>
                    <div className={styles.wrapItemSong}>
                        {dataSearch?.data?.data?.songs?.filter((item, index) => index < 3).map((item, index) => (
                            <div 
                                onClick={() => handleChooseSong(item, index)}
                                key={item.encodeId}
                            >
                                <SongItem item={item}/>
                            </div>
                        ))}
                    </div>

                    <div className={styles.wrapItemSong}>
                        {dataSearch?.data?.data?.songs?.filter((item, index) => index >=3 && index < 6).map((item, index) => (
                            <div 
                                onClick={() => handleChooseSong(item, index)}
                                key={item.encodeId}
                            >
                                <SongItem item={item}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={clsx(styles.playlist)}>
                <div className={clsx(styles.wrapTitle)}>
                    <h2 className={clsx(styles.titleName)}>PlayList/Album</h2>

                    <LinkAll path={`/${path.SEARCH}${path.PLAYLIST_ALBUM}`}/>
                </div>

                <div className={clsx(styles.wrapItem)}>
                    {dataSearch?.data?.data?.playlists?.filter((item, index) => index < 5).map(item => (
                        <ItemTheme 
                            item={item} 
                            key={item.encodeId}
                        />
                    ))}
                </div>
            </div>

            <div className={clsx(styles.artists)}>
                <div className={clsx(styles.wrapTitle)}>
                    <h2 className={clsx(styles.titleName)}>PlayList/Album</h2>

                    <LinkAll path={`/${path.SEARCH}${path.ARTIST}`}/>
                </div>

                <div className={clsx(styles.wrapArtists)}>
                    {dataSearch?.data?.data?.artists?.filter((item, index) => index < 5).map(item => (
                        <div 
                            className={clsx(styles.wrapArtist)}
                            key={item.id}
                        >
                            <ItemArtist item={item}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchAll