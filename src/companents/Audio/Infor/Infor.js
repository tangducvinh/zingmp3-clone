import clsx from 'clsx'

import styles from './Infor.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { inforBtn } from '../../../ultis/buttonAudio'

function Infor() { 
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrrapImg)}>
                <img className={clsx(styles.img)} src='https://thethaovanhoa.mediacdn.vn/thumb_w/1200/Upload/5uEz6bdJBvMUMWSN6HvH2A/files/2022/08/T8-2/dau%20co%20loi%20lam%20tb1.jpg' alt='image'></img>
            </div>

            <div className={clsx(styles.infor)}>
                <span className={clsx(styles.nameSong)}>Dẫu có lỗi lầm</span>
                <a href='' className={clsx(styles.nameSinger)}>Reddy</a>
            </div>

            <div className={clsx(styles.wrrapBtn)}>
                <ButtonAudio
                    item={inforBtn.loveBtn}
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