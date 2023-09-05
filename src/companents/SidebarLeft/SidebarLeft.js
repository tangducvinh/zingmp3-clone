import clsx from 'clsx'

import styles from './SidebarLeft.module.scss'

function SidebarLeft() {
    return (
        <div className={clsx(styles.container)}>
            <h1>Sidebar</h1>
        </div>
    )
}

export default SidebarLeft