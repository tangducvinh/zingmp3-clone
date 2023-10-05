import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Slider.module.scss'
import { handleSlider } from '../../ultis/func'
import * as action from '../../store/action'

function Slider() {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const imgElements = document.getElementsByClassName(styles.wrrapImg)
        var array = [0, 1, 2]

        const set = setInterval(() => {
            const list = handleSlider(array, imgElements.length - 1)

            for (var i = 0; i <= imgElements.length - 1; i++) {
                if (list.some(item => item === i)) {
                    imgElements[i].classList.remove(styles.unactive)
                } else {
                    imgElements[i].classList.add(styles.unactive)
                }

                imgElements[i].classList.remove(styles.orderBetween, styles.slideLeft)
                imgElements[i].classList.remove(styles.orderLast, styles.slideRight)
                imgElements[i].classList.remove(styles.orderFirst, styles.slideLeft2)
            }
            
            list.forEach((item, index) => {
                if (index === 0) {
                    imgElements[item]?.classList.add(styles.orderFirst, styles.slideLeft2)
                } else if (index === 1) {
                    imgElements[item]?.classList.add(styles.orderBetween, styles.slideLeft)
                } else {
                    imgElements[item]?.classList.add(styles.orderLast, styles.slideRight)
                }
            })
        }, 5000)

        return () => {
            clearInterval(set)
        }
    }, [])

    function handleClickBanner(item) {
        if (item.type === 1) {
            dispatch(action.setCurSongId(item.encodeId))
            dispatch(action.play(true))
        } else if (item.type === 4) {
            const playlistPatch = item.link.split('.')[0]
            navigate(playlistPatch)
        }
    }

    return (
        <div className={clsx(styles.container)}>
            {banner.map((item, index) => (
                <div
                    key={item.encodeId}
                    className={clsx(styles.wrrapImg, {[styles.unactive]: index > 2})}
                > 
                    <img 
                        className={clsx(styles.img)} 
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                    >
                    </img>
                </div>
            ))}
        </div>
    )
}

export default Slider