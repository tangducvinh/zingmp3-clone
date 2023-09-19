import clsx from 'clsx'

import styles from './InforSong.module.scss'

function InforSong({ sizeL, sizeM, item }) {
    return (
        <div className={styles.container}>
            <div className={clsx(styles.wrrapImg, {[styles.sizeL]: sizeL, [styles.sizeM]: sizeM})}>
                <img className={clsx(styles.img)} src={item?.thumbnail} alt='image'></img>
            </div>

            <div className={clsx(styles.infor)}>
                <span className={clsx(styles.nameSong)}>{item?.title}</span>
                <a href='' className={clsx(styles.nameSinger)}>{item?.artistsNames}</a>
            </div>
        </div>
    )
}

export default InforSong