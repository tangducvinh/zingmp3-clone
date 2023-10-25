import clsx from 'clsx'
import { memo } from 'react'

import styles from './Artists.module.scss'
import { ItemArtist } from '../ItemArtist'

function Artists({data}) {
    return (
        <div className={clsx(styles.container)}>
            {data?.filter((item, index) => index < 5).map(item => (
                <div 
                    className={clsx(styles.wrapArtist)}
                    key={item.id}
                >
                    <ItemArtist item={item}/>
                </div>
            ))}
        </div>
    )
}

export default memo(Artists)