import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import styles from './NoticeVip.module.scss'
import icons from '../../ultis/icon'
import logo from '../../asets/img/logo.svg'
import * as actions from '../../store/action'

function NoticeVip() {
    const { MdOutlineClear } = icons
    const dispatch = useDispatch()

    return (
        <div className={clsx(styles.container)}>
            <button 
                className={clsx(styles.btnCancel)}
                onClick={() => dispatch(actions.setShowVip(false))}
            >   
                <MdOutlineClear size={25}/>
            </button>

            <div className={clsx(styles.wrapNotice)}>
                <img className={clsx(styles.logoIcon)} src={logo} alt='logo'></img>
                <p className={clsx(styles.textVip)}>Bài hát này thuộc Vip</p>
            </div>
        </div>
    )
}

export default NoticeVip