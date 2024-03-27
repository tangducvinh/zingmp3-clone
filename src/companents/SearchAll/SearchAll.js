import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './SearchAll.module.scss'
import { ItemTheme } from '../ItemTheme'
import { LinkAll } from '../LinkAll'
import * as actions from '../../store/action'
import path from '../../ultis/path'
import { InforSong } from '../InforSong'
import { InforArtist } from '../InforArtist'
import { Songs } from '../Songs'
import { Artists } from '../Artists'
import { Mutating } from '../Spinner'

function SearchAll() {
    const { dataSearch, inforCurrent } = useSelector(state => state.music)
    const { isPlaying, loadingSearch } = useSelector(state => state.play)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLink(link) {
        const newLink = link.split('.')[0]
        navigate(newLink)
    }

    async function handleChooseSong(data) {
        dispatch(actions.setCurrent(data.encodeId))
        
        if (data.encodeId === inforCurrent.encodeId && isPlaying) dispatch(actions.play(false))
    }

    return (
        <div clsx={clsx(styles.container)}>
            {loadingSearch ? 
                    <div className={clsx(styles.loading)}><Mutating /></div>
                :
                 <>
                    {dataSearch?.data?.data?.top &&
                        <div className={clsx(styles.top)}>
                            <div className={clsx(styles.wrapTitle)}>
                                <h2 className={clsx(styles.titleName)}>Nổi Bật</h2>
                            </div>

                            {dataSearch?.data?.data?.top?.objectType === 'song' && 
                                <div 
                                    className={clsx(styles.wrapInfor)}
                                    onClick={() => handleChooseSong(dataSearch?.data?.data?.top)}
                                > 
                                    <InforSong item={dataSearch?.data?.data?.top} song sizeXL play={!isPlaying} playing={isPlaying && inforCurrent.encodeId === dataSearch?.data?.data?.top?.encodeId}/>
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
                    }

                    {dataSearch?.data?.data?.songs && 
                        <div className={clsx(styles.songs)}>
                            <div className={clsx(styles.wrapTitle)}>
                                <h2 className={clsx(styles.titleName)}>Bài Hát</h2>

                                <LinkAll path={`/${path.SEARCH}${path.SONG}`}/>
                            </div>

                            <div className={styles.wrapSongs}>
                                <Songs data={dataSearch?.data?.data?.songs}/>
                            </div>
                        </div>
                    }

                    {dataSearch?.data?.data?.playlists &&
                        <div className={clsx(styles.playlist)}>
                            <div className={clsx(styles.wrapTitle)}>
                                <h2 className={clsx(styles.titleName)}>PlayList/Album</h2>

                                <LinkAll path={`/${path.SEARCH}${path.PLAYLIST_ALBUM}`}/>
                            </div>

                            <div className={clsx(styles.wrapItem)}>
                                {dataSearch?.data?.data?.playlists?.filter((item, index) => index < 5).map((item, index) => (
                                    (index < 4) ? 
                                        <div className={clsx(styles.itemCss)} key={index}>
                                            <ItemTheme 
                                                item={item} 
                                                key={item.encodeId}
                                            />
                                        </div> 
                                        : 
                                        <div className={clsx(styles.itemCss, styles.hidden)} key={index}>
                                            <ItemTheme 
                                                item={item} 
                                                key={item.encodeId}
                                            />
                                        </div>  
                                ))}
                            </div>
                        </div>
                    }

                    {dataSearch?.data?.data?.artists &&
                        <div className={clsx(styles.artists)}>
                            <div className={clsx(styles.wrapTitle)}>
                                <h2 className={clsx(styles.titleName)}>Nghệ sĩ/OA</h2>

                                <LinkAll path={`/${path.SEARCH}${path.ARTIST}`}/>
                            </div>

                            <Artists data={dataSearch?.data?.data?.artists}/>
                        </div>
                    }
                </>    
            }
        </div>
    )
}

export default SearchAll