import clsx from 'clsx'
import { memo } from 'react'
import { useEffect, useState } from 'react'

import styles from './LibraryAlbum.module.scss'
import icons from '../../ultis/icon'
import { ItemTheme } from '../ItemTheme'

function LibraryAlbum({ dataAlbums = [] }) {
    const { MdFeaturedPlayList } = icons
    
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
                            <ItemTheme item={item}></ItemTheme>
                        </div>
                    ))}
                </div>
            } 
        </div>
    )
}

export default memo(LibraryAlbum)