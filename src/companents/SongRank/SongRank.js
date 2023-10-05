import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import styles from './SongRank.module.scss'
import { LinkAll } from '../LinkAll'
import icons from '../../ultis/icon'
import * as actions from '../../store/action'
import { AudioSpinner } from '../Spinner'
import { handleSliderRank, handleSlider } from '../../ultis/func'

function SongRank() {
    const { BsPlayCircle } = icons
    const { rankSong } = useSelector(state => state.app)
    const { isPlaying } = useSelector(state => state.play)
    const { curSongId } = useSelector(state => state.music)
    const dispatch = useDispatch()

    function handlePlaySong(id, index) {
        dispatch(actions.setCurSongId(id, index))
        dispatch(actions.play(true))
    }

    useEffect(() => {
        const itemElement = document.getElementsByClassName(styles.wrapItem)
        const array = [0, 1, 2]

        const set = setInterval(() => {
            var list = handleSliderRank(array)
            
            for (var i = 0; i <= itemElement.length; i++) {
                if (list?.some(item => item === i)) {
                    itemElement[i]?.classList.remove(styles.unActive)
                    itemElement[i]?.classList.add(styles.slideLeft)
                } else {
                    itemElement[i]?.classList.add(styles.unActive)
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
                        className={clsx(styles.wrapItem, {[styles.unActive]: index > 2})}
                        key={item.encodeId}
                    >
                        <div 
                            className={clsx(styles.wrapImg)}
                            onClick={() => handlePlaySong(item.encodeId, index)}
                        >
                            <img className={clsx(styles.img)} src={item.thumbnailM}></img>
                            {(isPlaying && item.encodeId === curSongId) ? 
                                <span className={clsx(styles.audioSpinner)}> <AudioSpinner/> </span> :
                                <span className={clsx(styles.playIcon)}> <BsPlayCircle size={40}/> </span>
                            }
                        </div>

                        <div className={clsx(styles.wrapInforSong)}>
                            <div className={clsx(styles.inforSong)}>
                                <p className={clsx(styles.nameSong)}>{item.title}</p>
                                <p className={clsx(styles.nameArtist)}>{item.artistsNames}</p>
                            </div>

                            <div className={clsx(styles.wrapRank)}>
                                <h1 className={clsx(styles.rank)}>{`#${index + 1}`}</h1>
                                <span className={clsx(styles.releaseDay)}>
                                    20.10.2030
                                </span>
                            </div>
                        </div>
                    </div> 
                    // <div className={clsx(styles.wrapEmpty)}> 
                    //     <Link 
                    //         className={clsx(styles.textEmpty)}
                    //         to={rankSong.link}
                    //     >
                    //         XEM TẤT CẢ
                    //     </Link>
                    // </div>
                ))}
            </div>
        </div>
    )
}

export default SongRank