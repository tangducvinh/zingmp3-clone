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
    const { dataSearch } = useSelector(state => state.music)
    const { isLoadingSearchSong } = useSelector(state => state.play)

    useEffect(() => {
        if (dataSearch) dispatch(actions.getSearchSong(dataSearch?.data?.data?.artists[0]?.id))
    }, [dataSearch])

    async function handleChooseSong(item, index) {
        console.log('here')
        dispatch(actions.load(true))
        const response = await apis.getSong(item.encodeId)
        dispatch(actions.load(false))

        if (response.data.err === 0) {
            dispatch(actions.setCurSongId(item.encodeId, index))
            dispatch(actions.setSourse(response.data.data['128']))
        }
        else dispatch(actions.setShowVip(true))

        dispatch(actions.setSkip(false))
    }

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
                    }
               </>
            :
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
                </div>}
        </>
    )
}

export default memo(SearchSong)