import clsx from 'clsx'
import { memo } from 'react'

import styles from './Theme.module.scss'
import { LinkAll } from '../LinkAll'
import { ItemTheme } from '../ItemTheme'

function Theme({ data }) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.title)}>{data?.title}</h1>

                {data?.link && <LinkAll path={data.link} />}
            </div>

            <div className={clsx(styles.content)}>
                {data?.items?.filter((item, index) => index < 5).map(item => (
                    <div 
                        className={clsx(styles.wrapItem)}
                        key={item.encodeId}
                    > 
                        <ItemTheme item={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Theme)