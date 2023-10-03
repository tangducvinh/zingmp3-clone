import { Outlet } from 'react-router-dom'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

import { SidebarLeft } from '../../../companents/SidebarLeft'
import { Header } from '../../../companents/Header'
import { Audio } from '../../../companents/Audio'
import { SidebarRight } from '../../../companents/SidebarRight'
import styles from './Public.module.scss'

function Public() {
    const { sidebarRight } = useSelector(state => state.play)
    
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrrapContent)}>
                <div className={clsx(styles.sidebarLeft)}>
                    <SidebarLeft />
                </div>
                
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.header)}>
                        <Header />
                    </div>

                    <div className={clsx(styles.outlet)}>
                        <Outlet />
                    </div>
                </div>

                <div className={clsx(styles.sidebarRight)}>
                    {sidebarRight && <SidebarRight />}
                </div>
            </div>

            <div className={clsx(styles.audio)}>
                <Audio />
            </div>
        </div>
    )
}

export default Public