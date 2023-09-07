import clsx from 'clsx'

import styles from './Header.module.scss'
import icons from '../../ultis/icon'
import { Sevice } from './Sevice'

const { HiOutlineArrowLeft, HiOutlineArrowRight, TfiSearch } = icons

function Header() {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.search)}>
                <button className={clsx(styles.btnLeft)}>
                    <HiOutlineArrowLeft size={21}/>
                </button>

                <button className={clsx(styles.btnRight)}>
                    <HiOutlineArrowRight size={21}/>
                </button>

                <form className={clsx(styles.formSeach)}>
                    <i className={clsx(styles.iconSearch)}><TfiSearch size={20} /></i>
                    <input className={clsx(styles.inputSearch)} placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'></input>
                </form>
            </div>

            <div className={clsx(styles.user)}>
                {<Sevice />}
                
                <button className={clsx(styles.avatar)}>
                    <img className={clsx(styles.imgAvatar)} src='https://toigingiuvedep.vn/wp-content/uploads/2022/11/hinh-anh-avatar-cute-de-thuong.jpg' alt='avatar'></img>
                </button>
            </div>
        </div>
    )
    
}

export default Header