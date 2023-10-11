import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/vi'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css';
import icons from '../../ultis/icon'

import styles from './InforSong.module.scss'

function InforSong({ sizeL, sizeM, item, time, play }) {
    const { TbPlayerPlayFilled } = icons

    return (
        <div className={styles.container}>
            <div className={clsx(styles.wrrapImg, {[styles.sizeL]: sizeL, [styles.sizeM]: sizeM})}>
                <img className={clsx(styles.img)} src={item?.thumbnail} alt='image'></img>

                {play && <span className={styles.iconPlay}><TbPlayerPlayFilled /></span>}
            </div>

            <div className={clsx(styles.infor, {[styles.inforM]: sizeM})}>
                {sizeM ? 
                    <p className={clsx(styles.nameSong)}>{item?.title?.length < 15 ? item?.title : `${item?.title?.slice(0, 15)}...`}</p> : 
                    <p className={clsx(styles.nameSong)}>{item?.title?.length < 30 ? item?.title : `${item?.title?.slice(0, 30)}...`}</p>
                }
                {sizeM ? 
                    <a href='#' className={clsx(styles.nameSinger)}>{item?.artistsNames.length < 15 ? item?.artistsNames : `${item?.artistsNames.slice(0, 15)}...`}</a> : 
                    <a href='#' className={clsx(styles.nameSinger)}>{item?.artistsNames}</a>
                }
                {time && <p className={clsx(styles.timeDisplay)}>{moment(item.releaseDate * 1000).fromNow()}</p>}
            </div>
        </div>
    )
}

export default InforSong