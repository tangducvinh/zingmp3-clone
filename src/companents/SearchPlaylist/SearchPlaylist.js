import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import {useEffect } from 'react'

import styles from './SearchPlaylist.module.scss'
import { ItemTheme } from '../ItemTheme'
import * as actions from '../../store/action'
import { LibrarySongEmpty } from '../LibrarySongEmpty'
import { Mutating } from '../../companents/Spinner'

function SearchPlaylist() {
    const { dataSearch, dataSearchPlaylist } = useSelector(state => state.music)
    const { isLoadingSearchPlaylist } = useSelector(state => state.play)
    const dispatch = useDispatch()


    useEffect(() => {
        const alias = dataSearch?.data?.data?.artists[0].alias
        dispatch(actions.getSearchPlaylist(alias))
    }, [dataSearch])

    return (
        <>
            {isLoadingSearchPlaylist ? 
                <div className={clsx(styles.loading)}>< Mutating /></div>  
            : 
                <div className={clsx(styles.container)}>
                    {dataSearchPlaylist?.length > 0 ? 
                            <>
                                <h1 className={clsx(styles.titleName)}>Playlist/Album</h1>

                                <div className={clsx(styles.wrapPlaylist)}>
                                    {dataSearchPlaylist?.map(item => (
                                        <div 
                                            className={clsx(styles.wrapItem)}
                                            key={item.encodeId}
                                        >
                                            <ItemTheme item={item} />
                                        </div>
                                    ))}
                                </div>   
                            </> 
                        : 
                            <LibrarySongEmpty />
                    }  
                </div>
            }
        </>
    )
}

export default SearchPlaylist