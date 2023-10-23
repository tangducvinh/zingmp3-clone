import clsx from 'clsx'
import { Outlet, NavLink } from 'react-router-dom'

import styles from './Search.module.scss'
import path from '../../../ultis/path'

function Search() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapOption)}>
                <h1 className={clsx(styles.title)}>Kết Quả Tìm Kiếm</h1>
                
                <div className={clsx(styles.wrapLink)}>
                    <NavLink 
                        className={({isActive}) => isActive ? styles.isActive : styles.link}
                        to={path.ALL}
                    >
                        TẤT CẢ
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => isActive ? styles.isActive : styles.link}
                        to={path.SONG}
                    >
                        BÀI HÁT
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => isActive ? styles.isActive : styles.link}
                        to={path.PLAYLIST_ALBUM}
                    >
                        PLAYLIST/ALBUM
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => isActive ? styles.isActive : styles.link}
                        to={path.ARTIST}
                    >
                        NGHỆ SĨ/OA
                    </NavLink>

                    <NavLink 
                        className={({isActive}) => isActive ? styles.isActive : styles.link}
                        to={path.VIDEO}
                    >
                        MV
                    </NavLink>
                    
                </div>
            </div>

            <Outlet />
            
        </div>
    )
}

export default Search