import clsx from 'clsx'
import { useState, useEffect } from 'react'

import styles from './Header.module.scss'
import icons from '../../ultis/icon'
import { Sevice } from './Sevice'
import * as apis from '../../apis'

const { HiOutlineArrowLeft, HiOutlineArrowRight, TfiSearch } = icons

function Header() {
    const [ keyword, setKeyword ] = useState('')

    async function handleSearch(e) {
        if (e.keyCode === 13) {
            const response = await apis.search(keyword)
            console.log(response)
        }
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.search)}>
                <button className={clsx(styles.btnLeft)}>
                    <HiOutlineArrowLeft size={21}/>
                </button>

                <button className={clsx(styles.btnRight)}>
                    <HiOutlineArrowRight size={21}/>
                </button>

                <div className={clsx(styles.formSeach)}>
                    <i className={clsx(styles.iconSearch)}><TfiSearch size={20} /></i>
                    <input 
                        className={clsx(styles.inputSearch)} 
                        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyUp={handleSearch}
                    >
                    </input>
                </div>
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