import clsx from 'clsx'
import { memo } from 'react'

import styles from './Theme.module.scss'
import { ItemTheme } from '../ItemTheme'

function Theme({ data, full }) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.title)}>{data?.title}</h1>

                {/* {data?.link && <LinkAll path={data.link} />} */}
            </div>

            <div className={clsx(styles.content)}>
                {full ? 
                    data?.items?.map(item => (
                        <div 
                            className={clsx(styles.wrapItem)}
                            key={item.encodeId}
                        > 
                            <ItemTheme item={item}></ItemTheme>
                        </div>
                    )) 
                    : 
                    data?.items?.filter((item, index) => index < 5).map((item, index) => (
                        (index < 4) ?     
                            <div 
                                className={clsx(styles.wrapItem)}
                                key={item.encodeId}
                            > 
                                <ItemTheme item={item}></ItemTheme>
                            </div> 
                        : 
                            <div 
                                className={clsx(styles.wrapItem, styles.hidden)}
                                key={item.encodeId}
                            > 
                                <ItemTheme item={item}></ItemTheme>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(Theme)