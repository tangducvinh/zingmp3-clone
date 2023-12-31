import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/vi'
import icons from '../../ultis/icon'

import styles from './InforSong.module.scss'
import { AudioSpinner } from '../Spinner'

function InforSong({ sizeL, sizeM, item, time, play, sizeSM, playing, song, sizeXL, playlist, nameSizeS}) {
    const { TbPlayerPlayFilled } = icons

    return (
        <div className={styles.container}>
            <div className={clsx(styles.wrrapImg, {[styles.sizeL]: sizeL, [styles.sizeM]: sizeM, [styles.sizeXL]: sizeXL})}>
                <img className={clsx(styles.img)} src={item?.thumbnail} alt='image'></img>

                {play && <span className={styles.iconPlay}><TbPlayerPlayFilled /></span>}
                {playing && <span className={styles.audioSpinner}><AudioSpinner /></span>}
            </div>

            <div className={clsx(styles.infor, {[styles.inforSM]: sizeSM})}>
                {song && <span className={clsx(styles.songText)}>Bài hát</span>}
                {playlist && <span className={clsx(styles.songText)}>Playlist</span>}

                {sizeSM ? 
                    <p className={clsx(styles.nameSong)}>{item?.title?.length < 15 ? item?.title : `${item?.title?.slice(0, 15)}...`}</p> : 
                nameSizeS ? <p className={clsx(styles.nameSong, styles.nameSongSizeS)}>{item?.title?.length < 20 ? item?.title : `${item?.title?.slice(0, 20)}...`}</p> :
                    <p className={clsx(styles.nameSong)}>{item?.title?.length < 25 ? item?.title : `${item?.title?.slice(0, 25)}...`}</p>
                }

                {sizeSM ? 
                    <a href='#' className={clsx(styles.nameSinger)}>{item?.artistsNames?.length < 15 ? item?.artistsNames : `${item?.artistsNames?.slice(0, 15)}...`}</a> : 
                    <a href='#' className={clsx(styles.nameSinger)}>{item?.artistsNames?.length < 20 ? item?.artistsNames : `${item?.artistsNames?.slice(0, 20)}...`}</a>
                }
                {time && <p className={clsx(styles.timeDisplay)}>{moment(item.releaseDate * 1000).fromNow()}</p>}
            </div>
        </div>
    )
}

export default InforSong