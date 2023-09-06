import { Outlet } from 'react-router-dom'
import clsx from 'clsx'

import { SidebarLeft } from '../../../companents/SidebarLeft'
import styles from './Public.module.scss'

function Public() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.sidebarLeft)}>
                <SidebarLeft />
            </div>
            
            <div className={clsx(styles.outLet)}>
                <Outlet />
            </div>
        </div>
    )

}

export default Public