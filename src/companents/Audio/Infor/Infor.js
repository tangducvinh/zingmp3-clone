import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Infor.module.scss'
import { ButtonAudio } from '../../ButtonAudio'
import { inforBtn } from '../../../ultis/buttonAudio'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { InforSong } from '../../../companents/InforSong'
import * as actions from '../../../store/action'

function Infor({ item }) { 
    const dispatch = useDispatch()
    const { dataFavoritePlaylist } = useSelector(state => state.music)

    function handleHeart() {
        if (dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)) {
            dispatch(actions.deleteFavoritePlaylist(item.encodeId))
        } else {
            dispatch(actions.addFavoritePlaylist(item))
        }
    }


    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.inforSong)}>
                <InforSong 
                    sizeL
                    item={item}  
                    cancelClick
                />
            </div>

            <div className={clsx(styles.wrrapBtn)} onClick={handleHeart}>
                <ButtonAudio
                    item={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId) ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                />
            </div>

            <div className={clsx(styles.wrrapBtn, styles.hidden)}>
                <ButtonAudio
                    item={inforBtn.addBtn}
                />
            </div>
        </div>
    )

}

export default Infor