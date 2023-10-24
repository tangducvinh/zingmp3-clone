import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './SearchAll.module.scss'
import { ItemTheme } from '../ItemTheme'
import { LinkAll } from '../LinkAll'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import { ItemArtist } from '../ItemArtist'
import path from '../../ultis/path'
import { InforSong } from '../InforSong'
import { InforArtist } from '../InforArtist'

function SearchAll() {
    const { dataSearch } = useSelector(state => state.music)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log(dataSearch)

    function handleChooseSong(item, index) {
        dispatch(actions.setCurSongId(item.encodeId, index))
        dispatch(actions.play(true))
        dispatch(actions.setRecentPlaylist(item))
    }

    function handleLink(link) {
        const newLink = link.split('.')[0]
        navigate(newLink)
    }

    return (
        <div clsx={clsx(styles.container)}>
            <div className={clsx(styles.top)}>
                <div className={clsx(styles.wrapTitle)}>
                    <h2 className={clsx(styles.titleName)}>Nổi Bật</h2>
                </div>

                {dataSearch?.data?.data?.top?.objectType === 'song' && 
                    <div 
                        className={clsx(styles.wrapInfor)}
                        onClick={() => handleLink(dataSearch?.data?.data?.top?.link)}
                    > 
                        <InforSong item={dataSearch?.data?.data?.top} song sizeXL/>
                    </div>
                }

                {dataSearch?.data?.data?.top?.objectType === 'playlist' && 
                    <div 
                        className={clsx(styles.wrapInfor)}
                        onClick={() => handleLink(dataSearch?.data?.data?.top?.link)}
                    > 
                        <InforSong item={dataSearch?.data?.data?.top} playlist sizeXL/>
                    </div>
                }

                {dataSearch?.data?.data?.top?.objectType === 'artist' && 
                    <div 
                        className={clsx(styles.wrapInfor)}
                        onClick={() => handleLink(dataSearch?.data?.data?.top?.link)}
                    > 
                        <InforArtist item={dataSearch?.data?.data?.top} totalFollow={dataSearch?.data?.data?.artists[0].totalFollow}/>
                    </div>
                }
            </div>


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