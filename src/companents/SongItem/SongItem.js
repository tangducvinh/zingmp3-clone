import clsx from 'clsx'
import styles from './SongItem.module.scss'
import { memo } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { InforSong } from '../InforSong'
import { ButtonAudio } from '../ButtonAudio'
import { inforBtn } from '../../ultis/buttonAudio'
import icons from '../../ultis/icon'
import * as actions from '../../store/action'

function SongItem({item, icon, nameSizeS, playing, index, zingchart, zingchartM, cancelClick = false, favorite = false}) {
    const dispatch = useDispatch()
    const { LuMusic, AiOutlineLine } = icons
    const { pid } = useParams()

    function handleHeart(e) {
        e.stopPropagation()
        if (favorite) {
            dispatch(actions.deleteFavoritePlaylist(item.encodeId))
        } else {
            dispatch(actions.addFavoritePlaylist(item))
        }
    }

    function handleChooseSong() {
        if (!cancelClick) {
            dispatch(actions.setCurrent(item.encodeId, pid))
        }
    }

    return (
        <div className={clsx(styles.container)} onClick={handleChooseSong}>
            <div className={clsx(styles.inforItem, {[styles.inforItemZingchartM]: zingchartM})}>
                {icon && <span className={clsx(styles.icon)}><LuMusic size={16}/></span>}

                {zingchart && 
                    <span className={clsx(styles.topSong, {[styles.topSongZingchartM]: zingchartM})}>
                        {zingchartM ? 
                            (<span>{index + 1}</span>):
                            (index === 0 ? <span className={clsx(styles.suggest)}>Gợi ý</span> : <span>{index}</span>)
                        }
                    </span>
                }
                {zingchart && <span className={clsx(styles.lineIcon)}><AiOutlineLine size={15}/></span>}
                
                <InforSong 
                    item={item}
                    sizeM
                    nameSizeS={nameSizeS}
                    playing={playing}
                />
            </div>

            {!nameSizeS && 
                <a href='' className={clsx(styles.name)}> 
                    {item?.album?.title.length > 30 ? 
                    `${item?.album?.title.slice(0, 30)}...` : 
                    item?.album?.title} 
                </a>
            } 
                
            <span className={clsx(styles.duration)}>
                <div className={clsx(styles.wrrapBtn)} onClick={handleHeart}>
                    <ButtonAudio
                        item={favorite ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                    />
                </div>

                <p className={clsx(styles.textDuration)}>{moment(item.duration * 1000).format('mm:ss')}</p>
            </span>
        </div>
    )
}

export default memo(SongItem)