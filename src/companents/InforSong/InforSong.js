import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/vi'

import styles from './InforSong.module.scss'

function InforSong({ sizeL, sizeM, item, time }) {
    return (
        <div className={styles.container}>
            <div className={clsx(styles.wrrapImg, {[styles.sizeL]: sizeL, [styles.sizeM]: sizeM})}>
                <img className={clsx(styles.img)} src={item?.thumbnail} alt='image'></img>
            </div>

            <div className={clsx(styles.infor)}>
                <p className={clsx(styles.nameSong)}>{item?.title?.length < 30 ? item?.title : `${item?.title?.slice(0, 30)}...`}</p>
                <a href='#' className={clsx(styles.nameSinger)}>{item?.artistsNames}</a>
                {time && <p className={clsx(styles.timeDisplay)}>{moment(item.releaseDate * 1000).fromNow()}</p>}
            </div>
        </div>
    )
}

export default InforSong