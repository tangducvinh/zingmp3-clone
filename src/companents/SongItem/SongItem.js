import clsx from 'clsx'
import styles from './SongItem.module.scss'
import { memo } from 'react'
import moment from 'moment'

import { InforSong } from '../InforSong'
import icons from '../../ultis/icon'

function SongItem({item, icon, nameSizeS, playing, index, zingchart, zingchartM}) {
    const { LuMusic, AiOutlineLine } = icons
    return (
        <div className={clsx(styles.container)}>
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
                
            <span className={clsx(styles.duration)}>{moment(item.duration * 1000).format('mm:ss')}</span>
        </div>
    )
}

export default memo(SongItem)