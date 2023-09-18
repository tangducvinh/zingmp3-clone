import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moment from 'moment'

import styles from './Album.module.scss'
import * as apis from '../../../apis'
import { inforBtn } from '../../../ultis/buttonAudio'
import { ButtonAudio } from '../../../companents/ButtonAudio'
import { buttonAlbum } from '../../../ultis/button'
import { Button } from '../../../companents/Button'
import icons from '../../../ultis/icon'
import { InforSong } from '../../../companents/InforSong'

function Album() {
    const { name, pid } = useParams()
    const { LuMusic } = icons
    const [data, setData] = useState({})
    const [infor, setInfor] = useState({})

    useEffect(() => {
        async function fetchDetailPlaylist() {
            const response = await apis.getDetailtPlaylist(pid)
            
            if(response.data.err === 0) {
                setInfor(response.data.data.song.items[0])
                setData(response.data.data)
            }
        }

        fetchDetailPlaylist(pid)
    }, [pid])

    console.log(data)

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.album)}>
                <div className={clsx(styles.wrrapInfor)}>
                    <div className={clsx(styles.wrrapImg)}>
                        <img className={clsx(styles.imgAlbum)} src={data.thumbnailM}></img>
                    </div>

                    <h3 className={clsx(styles.title)}>{data.title}</h3>

                    <p>
                        <span>Cập nhật: </span>
                        <span>{moment.unix(data.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </p>

                    <p className={clsx(styles.singer)}>
                        <span>{data.artistsNames}</span>
                    </p>

                    <p> {`${Math.round(data.like / 1000)}K người yêu thích`}</p>

                    <div className={clsx(styles.play)}>
                        <Button item={buttonAlbum.play}/>
                    </div>

                    <div className={clsx(styles.wrrapOption)}>
                        <div className={clsx(styles.loveBtn)}>
                            <ButtonAudio item={inforBtn.loveBtnOutline}/>
                        </div>

                        <div className={clsx(styles.addBtn)}>
                            <ButtonAudio item={inforBtn.addBtnAlbum}/>
                        </div>
                    </div>
                </div>
        
                <div className={clsx(styles.wrrapList)}>
                    <p className={clsx(styles.title)}>
                        <span className={clsx(styles.header)}>Lời tựa </span>
                        <span className={clsx(styles.singerName)}>BigDaddy, Emily và 30 bản Hit V-Pop nổi bật nhất hiện nay</span>
                    </p>

                    <ul className={clsx(styles.list)}>
                        <div className={clsx(styles.category)}>
                            <span>BÀI HÁT</span>
                            <span>ALBUM</span>
                            <span>THỜI GIAN</span>
                        </div>

                        <div className={clsx(styles.content)}>
                            <div className={clsx(styles.inforItem)}>
                                <LuMusic />
                                <InforSong 
                                    item={infor}
                                    sizeM
                                />
                            </div>

                            <span>Mua thang six</span>

                            <span>thoi gian</span>
                        </div>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Album