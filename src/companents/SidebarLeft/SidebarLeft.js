import clsx from 'clsx'
import { NavLink, Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

import styles from './SidebarLeft.module.scss'
import logo from '../../asets/img/logo.svg'
import { menuSidebar, menuSidebarRank, menuSidebarMymusic } from '../../ultis/menuSidebar'

function SidebarLeft() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.logo)}>
                <img className={clsx(styles.logoIcon)} src={logo} alt='logo'></img>
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
                        <span>{item.text}</span>
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
                            <span>{item.text}</span>
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
                            <span>{item.text}</span>
                            <span className={clsx(styles.play)}>{item.play}</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className={clsx(styles.creatPlaylist)}>
                <i className={clsx(styles.iconPlus)}><AiOutlinePlus /></i>
                <span>Tạo playlist mới</span>
            </div>
        </div>
    )
}

export default SidebarLeft