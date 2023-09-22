import { Outlet } from 'react-router-dom'
import clsx from 'clsx'

import { SidebarLeft } from '../../../companents/SidebarLeft'
import { Header } from '../../../companents/Header'
import { Audio } from '../../../companents/Audio'
import styles from './Public.module.scss'

function Public() {
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
            </div>

            <div className={clsx(styles.audio)}>
                <Audio />
            </div>
        </div>
    )
}

export default Public