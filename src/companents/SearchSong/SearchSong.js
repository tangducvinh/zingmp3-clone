import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, memo } from 'react'

import styles from './SearchSong.module.scss'
import { SongItem } from '../SongItem'
import * as actions from '../../store/action'
import { LibrarySongEmpty } from '../LibrarySongEmpty' 
import { Mutating } from '../../companents/Spinner'
import * as apis from '../../apis'

function SearchSong({data, hide, loading}) {
    const dispatch = useDispatch()
    const { dataSearch, dataFavoritePlaylist } = useSelector(state => state.music)
    const { isLoadingSearchSong } = useSelector(state => state.play)

    useEffect(() => {
        if (dataSearch) dispatch(actions.getSearchSong(dataSearch?.data?.data?.artists[0]?.id))
    }, [dataSearch])


    return (
        <>
            {loading ? 
               <>
                    {isLoadingSearchSong ? 
                        <div className={clsx(styles.loading)}><Mutating /></div>
                    :
                        <div className={clsx(styles.container)}>
                            {!hide && <h1 className={clsx(styles.titleName)}>Bài Hát</h1>}

                            {data?.length >= 1 ?
                                <div className={clsx(styles.wrapSongs)}>
                                    {data?.map((item) => (
                                        <div 
                                            key={item.encodeId}
                                        >
                                            <SongItem favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} item={item}/>
                                        </div>
                                    ))}
                                </div> 
                                :
                                <LibrarySongEmpty />
                            }
                        </div>
                    }
               </>
            :
                <div className={clsx(styles.container)}>
                    {!hide && <h1 className={clsx(styles.titleName)}>Bài Hát</h1>}

                    {data?.length >= 1 ?
                        <div className={clsx(styles.wrapSongs)}>
                            {data?.map((item) => (
                                <div 
                                    key={item.encodeId}
                                >
                                    <SongItem favorite={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)} item={item}/>
                                </div>
                            ))}
                        </div> 
                        :
                        <LibrarySongEmpty />
                    }
                </div>}
        </>
    )
}

export default memo(SearchSong)