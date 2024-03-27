import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import styles from './SongRank.module.scss'
import { LinkAll } from '../LinkAll'
import icons from '../../ultis/icon'
import * as actions from '../../store/action'
import { AudioSpinner } from '../Spinner'
import { handleSliderRank } from '../../ultis/func'
import * as apis from '../../apis'

function SongRank() {
    const { BsPlayCircle } = icons
    const { rankSong } = useSelector(state => state.app)
    const { isPlaying } = useSelector(state => state.play)
    const { curSongId } = useSelector(state => state.music)
    const dispatch = useDispatch()

    async function handlePlaySong(id) {
        // dispatch(actions.setCurSongId(id, index))
        dispatch(actions.setCurrent(id))
    }

    useEffect(() => {
        const itemElement = document.getElementsByClassName(styles.wrapItem)
        const array = [0, 1, 2]

        const set = setInterval( async() => {
            var list = handleSliderRank(array)
            for (let i = 0; i <= itemElement.length; i++) {
                if (list?.some(item => item === i)) {
                    itemElement[i]?.classList.remove(styles.unActive)
                    itemElement[i]?.classList.add(styles.slideLeft)
                } else {
                    itemElement[i]?.classList.add(styles.unActive)
                    itemElement[i]?.classList.remove(styles.slideLeft)
                }
            }
        }, 5000)

        return () => clearInterval(set)
    }, [])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapTitle)}>
                <h3 className={clsx(styles.title)}>{rankSong.title}</h3>

                <LinkAll path={rankSong.link}></LinkAll>
            </div>

            <div className={clsx(styles.content)}>
                {rankSong?.items?.map((item, index) => (
                    <div 
                        className={clsx(styles.wrapItem, {[styles.unActive]: index > 2, [styles.hidden]: index === 2 || index === 5})}
                        key={item.encodeId}
                    >
                        <div 
                            className={clsx(styles.wrapImg)}
                            onClick={() => handlePlaySong(item.encodeId)}
                        >
                            <img className={clsx(styles.img)} src={item.thumbnailM} alt='singer'></img>
                            {(isPlaying && item.encodeId === curSongId) ? 
                                <span className={clsx(styles.audioSpinner)}> <AudioSpinner/> </span> :
                                <span className={clsx(styles.playIcon)}> <BsPlayCircle size={40}/> </span>
                            }
                        </div>

                        <div className={clsx(styles.wrapInforSong)}>
                            <div className={clsx(styles.inforSong)}>
                                <p className={clsx(styles.nameSong)}>{item.title.length < 30 ? item.title : `${item.title.slice(0, 30)}...`}</p>
                                <p className={clsx(styles.nameArtist)}>{item.artistsNames.length < 20 ? item.artistsNames : `${item.artistsNames.slice(0, 20)}...`}</p>
                            </div>

                            <div className={clsx(styles.wrapRank)}>
                                <h1 className={clsx(styles.rank)}>{`#${index + 1}`}</h1>
                                <span className={clsx(styles.releaseDay)}>
                                    20.10.2030
                                </span>
                            </div>
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default SongRank