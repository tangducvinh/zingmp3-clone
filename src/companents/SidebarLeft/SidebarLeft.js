import clsx from 'clsx'
import { NavLink, Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import styles from './SidebarLeft.module.scss'
import logo from '../../asets/img/logo.svg'
import { menuSidebar, menuSidebarRank, menuSidebarMymusic } from '../../ultis/menuSidebar'

function SidebarLeft() {
    const { curSongId } = useSelector(state => state.music)

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.logo)}>
                <img className={clsx(styles.logoIcon, styles.hidden)} src={logo} alt='logo'></img>
                <img className={clsx(styles.iconSmall)} src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.92/static/media/icon_zing_mp3_60.f6b51045.svg'></img>
            </div>

            <div className={clsx(styles.menu)}>
                {menuSidebar.map(item => 
                    <NavLink 
                        key={item.path}
                        to={item.path}
                        className={({isActive}) => isActive ? clsx(styles.active) : clsx(styles.link)} 
                        href='/' 
                    >
                        {item.icon}
                        <span className={clsx(styles.hidden)}>{item.text}</span>
                        <span className={clsx(styles.play)}>{item.play}</span>
                    </NavLink>
                )}
            </div>

            <div className={clsx(styles.divide)}>
                <div className={clsx(styles.rank)}>
                    {menuSidebarRank.map(item => 
                        <NavLink 
                            key={item.path}
                            to={item.path}
                            className={({isActive}) => isActive ? clsx(styles.active) : clsx(styles.link)} 
                            href='/' 
                        >
                            {item.icon}
                            <span className={clsx(styles.hidden)}>{item.text}</span>
                            <span className={clsx(styles.play)}>{item.play}</span>
                        </NavLink>
                    )}
                </div>

                <div className={clsx(styles.myMusic)}>
                    {menuSidebarMymusic.map(item => 
                        <Link 
                            key={item.path}
                            to={item.path}
                            className={clsx(styles.link)} 
                            href='/' 
                        >
                            {item.icon}
                            <span className={clsx(styles.hidden)}>{item.text}</span>
                            <span className={clsx(styles.play)}>{item.play}</span>
                        </Link>
                    )}
                </div>

                {curSongId && <div className={clsx(styles.fakeCreatPlaylist)}></div>}
            </div>

            <div className={clsx(styles.creatPlaylist, {[styles.creatPlaylistBottom]: curSongId})}>
                <i className={clsx(styles.iconPlus)}><AiOutlinePlus /></i>
                <span className={clsx(styles.hidden)}>Tạo playlist mới</span>
            </div>

            {curSongId && <div className={clsx(styles.fakeAudio)}></div>}
        </div>
    )
}

export default SidebarLeft