import clsx from 'clsx'
import { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './ItemTheme.module.scss'
import icons from '../../ultis/icon'
import { ButtonAudio } from '../ButtonAudio'
import { inforBtn } from '../../ultis/buttonAudio'
import * as actions from '../../store/action'

function ItemTheme({ item, sizeS, favorite = false }) {
    const { BsPlayCircle } = icons
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const imgElement = useRef()

    function handleChooseAlbum(link) {
        const path = link.split('.')[0]
        navigate(path, {state: {playAlbum: false}})
    }

    function handleHover() {
        imgElement.current.classList.remove('scaleOutCenter')
        imgElement.current.classList.add('scaleInCenter')
    }

    function handleLeave() {
        imgElement.current.classList.remove('scaleInCenter')
        imgElement.current.classList.add('scaleOutCenter')
    }

    function handleChosePlay(e, link) {
        e.stopPropagation()
        const path = link.split('.')[0]
        navigate(path, {state: {playAlbum: true}})
    }

    function handleHeart(e) {
        e.stopPropagation()
        if (favorite) {
            console.log(item.encodeId)
            dispatch(actions.deleteFavoriteAlbum(item.encodeId))
        } else {
            dispatch(actions.addFavoriteAlbum(item))
        }
    }

    return (
        <div className={clsx(styles.container)}>
            <div 
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className={clsx(styles.wrapImg, {[styles.wrapImgSizeS]: sizeS})}
                onClick={() => handleChooseAlbum(item?.link)}
            >
                <img 
                    className={clsx(styles.img)} 
                    ref={imgElement}
                    src={item.thumbnailM} 
                    alt='image'
                >
                </img>

                <div className={clsx(styles.option, {[styles.optionSizeS]: sizeS})}>
                    <div className={clsx(styles.btnLove)} onClick={handleHeart}>
                        <ButtonAudio
                            item={favorite ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                        />
                    </div>

                    <span 
                        className={clsx(styles.btnPlay)}
                        onClick={(e) => handleChosePlay(e, item.link)}
                    >
                        <BsPlayCircle />
                    </span>

                    <span className={clsx(styles.btnMore)}>
                        <ButtonAudio item={inforBtn.addBtnAlbum} />
                    </span>
                </div>
            </div>

            {!sizeS && 
                <span className={clsx(styles.description)}>
                    {item.sortDescription === '' ? 
                        item.title : 
                        item.sortDescription?.length > 50 ? `${item.sortDescription.slice(0, 50)} ...` : item.sortDescription
                    }
                </span>
            }
        </div> 
    )
}

export default memo(ItemTheme)