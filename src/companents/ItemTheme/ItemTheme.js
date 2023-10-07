import clsx from 'clsx'
import { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ItemTheme.module.scss'
import icons from '../../ultis/icon'
import { ButtonAudio } from '../ButtonAudio'
import { inforBtn } from '../../ultis/buttonAudio'

function ItemTheme({ item }) {
    const { BsPlayCircle } = icons
    const navigate = useNavigate()
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

    return (
        <div className={clsx(styles.container)}>
            <div 
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                className={clsx(styles.wrapImg)}
                onClick={() => handleChooseAlbum(item?.link)}
            >
                <img 
                    className={clsx(styles.img)} 
                    ref={imgElement}
                    src={item.thumbnailM} 
                    alt='image'
                >
                </img>

                <div className={clsx(styles.option)}>
                    <span className={clsx(styles.btnLove)}> 
                        <ButtonAudio item={inforBtn.loveBtnOutline}/>
                    </span>

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

            <span className={clsx(styles.description)}>
                {item.sortDescription === '' ? 
                    item.title : 
                    item.sortDescription?.length > 50 ? `${item.sortDescription.slice(0, 50)} ...` : item.sortDescription
                }
            </span>
        </div> 
    )
}

export default memo(ItemTheme)