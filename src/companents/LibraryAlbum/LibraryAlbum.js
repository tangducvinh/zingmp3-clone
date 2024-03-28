import clsx from 'clsx'
import { memo } from 'react'
import { useSelector } from 'react-redux'

import styles from './LibraryAlbum.module.scss'
import icons from '../../ultis/icon'
import { ItemTheme } from '../ItemTheme'
import { SiTarget } from 'react-icons/si'


function LibraryAlbum({ dataAlbums = [] }) {
    const { MdFeaturedPlayList } = icons
    const { dataFavoriteAlbum } = useSelector(state => state.music)
    
    return (
        <div className={clsx(styles.container)}>
            {dataAlbums?.length < 1 ? 
                <div className={clsx(styles.empty)}>
                    <MdFeaturedPlayList size={70} color={'white'}/>
                    <p className={clsx(styles.textAnnouncement)}>Chưa có album trong thư viện</p>
                </div>
                :
                <div className={clsx(styles.content)}>
                    {dataAlbums?.map((item, index) => (
                        <div className={clsx(styles.item)} key={index}>
                            <ItemTheme favorite={dataFavoriteAlbum.some(el => el.encodeId === item.encodeId)} item={item}></ItemTheme>
                        </div>
                    ))}
                </div>
            } 
        </div>
    )
}

export default memo(LibraryAlbum)