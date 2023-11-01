import clsx from 'clsx'
import { Outlet, NavLink } from 'react-router-dom'
import { useRef, useEffect } from 'react'

import styles from './Search.module.scss'
import path from '../../../ultis/path'

function Search() {
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapOption)} ref={ref}>
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