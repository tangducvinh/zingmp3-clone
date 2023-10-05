import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './LinkAll.module.scss'
import icons from '../../ultis/icon'

function LinkAll({ path }) {
    const { HiOutlineChevronRight } = icons

    return (
        <Link
            className={clsx(styles.container)}
            to={path}
        >
            <span>TẤT CẢ</span>
            <span><HiOutlineChevronRight size={16}/></span>
        </Link>
    )
}

export default LinkAll