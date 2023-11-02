import clsx from 'clsx'
import { NavLink, Outlet } from 'react-router-dom'

import styles from './Library.module.scss'
import icons from '../../../ultis/icon'
import path from '../../../ultis/path'

function Library() {
    const { HiPlay } = icons

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h1 className={clsx(styles.titleName)}>Thư viện</h1>
                <span className={clsx(styles.wrapIconPlay)}>
                    <HiPlay size={25}/>
                </span>
            </div>

            <div className={clsx(styles.option)}>
                <NavLink 
                    className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                    to={path.MYMUSIC_SONG}
                >
                    BÀI HÁT
                </NavLink>

                <NavLink 
                    className={({isActive}) => isActive ? styles.optionNameActive : styles.optionName}
                    to={path.MYMUSIC_ALBUM}
                >
                    ALBUM
                </NavLink>
            </div>

            <div className={clsx(styles.outlet)}>
                <Outlet />
            </div>
        </div>
    )
}

export default Library