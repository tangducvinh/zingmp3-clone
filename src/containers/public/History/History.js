import clsx from 'clsx'
import { NavLink, Outlet } from 'react-router-dom'
import { useRef, useEffect } from 'react'

import styles from './History.module.scss'
import path from '../../../ultis/path'
function History() {
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)} ref={ref}>
                <h1 className={clsx(styles.title)}>Phát gần đây</h1>

                <div className={clsx(styles.wrapOption)}>
                    <NavLink 
                        className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                        to={`/${path.HISTORY}/${path.MYMUSIC_SONG}`}
                    >
                        BÀI HÁT
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                        to={`/${path.HISTORY}/${path.MYMUSIC_ALBUM}`}
                    >
                        PLAYLIST
                    </NavLink>
                </div>
            </div>

            <div className={clsx(styles.outlet)}><Outlet /></div>
        </div>
    )
}

export default History