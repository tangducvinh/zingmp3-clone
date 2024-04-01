import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { InforArtistSearch } from '../InforArtistSearch'
import { InforSong } from '../InforSong'
import styles from './SearchInfor.module.scss'
import icons from '../../ultis/icon'
import * as actions from '../../store/action'
import { ButtonAudio } from '../ButtonAudio'
import { inforBtn } from '../../ultis/buttonAudio'


function SearchInfor({ onSetData, keywordLive, dataSongs, dataArtist, onSetShowSearch }) {
    const { dataHistoryKeyword } = useSelector(state => state.app)
    const { inforCurrent, dataFavoritePlaylist } = useSelector(state => state.music)
    const { isPlaying } = useSelector(state => state.play)
    const [ status, setStatus ] = useState(0)
    const { BiHistory, TfiSearch } = icons
    const dispatch = useDispatch()

    useEffect(() => {
        if (keywordLive.length > 0) setStatus(1)
        else setStatus(0)
    }, [keywordLive])

    async function handleChooseSong(item) {
        dispatch(actions.setCurrent(item.encodeId))
    }

    function handleHeart(e, item) {
        e.stopPropagation()
        if (dataFavoritePlaylist.some(el => el.encodeId === item.encodeId)) {
            dispatch(actions.deleteFavoritePlaylist(item.encodeId))
        } else {
            dispatch(actions.addFavoritePlaylist(item))
        }
    }

    return (
        <div className={clsx(styles.container)}>
            {status === 0 && 
                <div className={styles.wrapKeywords}>
                    <p className={clsx(styles.title)}>Lịch sử tìm kiếm</p>

                    {dataHistoryKeyword?.map((item, index) => (
                        <div 
                            className={clsx(styles.wrapInforText)}
                            onClick={() => onSetData(item)}
                            key={index}
                        >
                            <BiHistory size={19} color={'gray'}/>
                            <span className={clsx(styles.inforText)}>{item}</span>
                        </div>  
                    ))}
                </div>
            }
 
            {status === 1 && 
                <div className={clsx(styles.wrapKeywordSearch)}>
                    <p className={clsx(styles.title)}>Từ khoá</p>
                    <div 
                        className={clsx(styles.wrapInforText)}
                        onClick={() => onSetData(keywordLive)}
                    >
                        <TfiSearch size={19} color={'gray'}/>
                        <span className={clsx(styles.inforText)}>
                            Tìm kiếm
                            <span className={clsx(styles.textKeyword)}>{` "${keywordLive}"`}</span>
                        </span>
                    </div>

                    <div className={clsx(styles.wrapSongs)}>
                        <p className={clsx(styles.title, styles.borderTop)}>Gợi ý kết quả</p>

                        {dataArtist && <InforArtistSearch name={dataArtist?.alias} onSetShowSearch={onSetShowSearch} image={dataArtist?.thumbnailM} total={dataArtist?.totalFollow} role={'Nghệ sĩ'} link={dataArtist?.link}/>}

                        <div className={clsx(styles.wrapInforSong)}>
                            {dataSongs?.filter((el, index) => index < 4)?.map((item, index) => 
                                <div 
                                    key={item.encodeId}
                                    className={clsx(styles.inforSong)}
                                    onClick={() => handleChooseSong(item)}
                                >
                                    <InforSong sizeM item={item} play playing={inforCurrent.encodeId === item.encodeId && isPlaying}></InforSong>

                                    <div className={clsx(styles.wrrapBtn)} onClick={(e) => handleHeart(e, item)}>
                                        <ButtonAudio
                                            item={dataFavoritePlaylist.some(el => el.encodeId === item.encodeId) ? inforBtn.loveBtnFill : inforBtn.loveBtnOutline}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default memo(SearchInfor)