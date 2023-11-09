import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Slider.module.scss'
import { handleSlider, handleBackSlice } from '../../ultis/func'
import * as action from '../../store/action'
import icons from '../../ultis/icon'

function Slider() {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { AiOutlineRight, AiOutlineLeft} = icons
    const imgElements = document.getElementsByClassName(styles.wrrapImg)
    var array = [0, 1, 2]

    useEffect(() => {
        const set = setInterval(() => {
            handleBtnNext()
        }, 5000)

        return () => {
            clearInterval(set)
        }
    }, [])

    function handleBtnNext() {
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

            imgElements[i].classList.remove(styles.orderFirst, styles.slideLeft1)
            imgElements[i].classList.remove(styles.orderBetween, styles.slideRight1)
            imgElements[i].classList.remove(styles.orderLast, styles.slideRight2)
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
    }

    function handleBtnBack() {
        const list = handleBackSlice(array, imgElements.length - 1)

        for(let i = 0; i <= imgElements.length - 1; i++) {
            if (list.some(item => item === i)) {
                imgElements[i].classList.remove(styles.unactive)
            } else {
                imgElements[i].classList.add(styles.unactive)
            }

            imgElements[i].classList.remove(styles.orderBetween, styles.slideLeft)
            imgElements[i].classList.remove(styles.orderLast, styles.slideRight)
            imgElements[i].classList.remove(styles.orderFirst, styles.slideLeft2)

            imgElements[i].classList.remove(styles.orderFirst, styles.slideLeft1)
            imgElements[i].classList.remove(styles.orderBetween, styles.slideRight1)
            imgElements[i].classList.remove(styles.orderLast, styles.slideRight2)
        }

        list.forEach((item, index) => {
            if (index === 0) {
                imgElements[item].classList.add(styles.orderFirst, styles.slideLeft1)
            } else if (index === 1) {
                imgElements[item].classList.add(styles.orderBetween, styles.slideRight1)
            } else {
                imgElements[item].classList.add(styles.orderLast, styles.slideRight2)
            }
        })
    }

    function handleClickBanner(item) {
        if (item.type === 1) {
            dispatch(action.setCurSongId(item.encodeId))
            dispatch(action.setSkip(false))
        } else if (item.type === 4) {
            const playlistPatch = item.link.split('.')[0]
            navigate(playlistPatch)
        }
    }

    return (
        <div className={clsx(styles.container)}>
            <div 
                className={clsx(styles.wrapBtnLeft)}
                onClick={handleBtnBack}
            >
                <AiOutlineLeft size={25}/>
            </div>

            <div 
                className={clsx(styles.wrapBtnRight)}
                onClick={handleBtnNext}
            >
                <AiOutlineRight size={25}/>
            </div>

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