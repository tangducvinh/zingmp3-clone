import clsx from 'clsx'
import { useState } from 'react'

import styles from './Infor.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { inforBtn } from '../../../ultis/buttonAudio'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { InforSong } from '../../../companents/InforSong'

function Infor({ item }) { 

    const [isHeart, setIsHeart] = useState(false)

    function handleHeart() {
        setIsHeart(!isHeart)
    }

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.inforSong)}>
                <InforSong 
                    sizeL
                    item={item}  
                />
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