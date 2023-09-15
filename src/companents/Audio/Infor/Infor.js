import clsx from 'clsx'
import { useState } from 'react'

import styles from './Infor.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { inforBtn } from '../../../ultis/buttonAudio'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'

function Infor({ title, img, artistsNames}) { 

    const [isHeart, setIsHeart] = useState(false)

    function handleHeart() {
        setIsHeart(!isHeart)
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrrapImg)}>
                <img className={clsx(styles.img)} src={img} alt='image'></img>
            </div>

            <div className={clsx(styles.infor)}>
                <span className={clsx(styles.nameSong)}>{title}</span>
                <a href='' className={clsx(styles.nameSinger)}>{artistsNames}</a>
            </div>

            <div className={clsx(styles.wrrapBtn)} onClick={handleHeart}>
                <ButtonAudio
                    item={isHeart ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                />
            </div>

            <div className={clsx(styles.wrrapBtn)}>
                <ButtonAudio
                    item={inforBtn.addBtn}
                />
            </div>
        </div>
    )

}

export default Infor