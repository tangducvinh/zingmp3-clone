import clsx from 'clsx'
import { memo } from 'react'

import styles from './NewReleaseArtist.module.scss'
import { ItemTheme } from '../ItemTheme'

function NewReleaseArtist({data}) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapImg)}>
               <ItemTheme item={data} sizeS/>
            </div>

            <div className={clsx(styles.content)}>
                <span className={clsx(styles.type)}>{data.textType}</span>
                <p className={clsx(styles.albumName)}>{data.title}</p>
                <a href='' className={clsx(styles.artistsName)}>{data.artistsNames}</a>
                <span className={clsx(styles.date)}>{data.releaseDate}</span>
            </div>
        </div>
    )
}

export default memo(NewReleaseArtist)