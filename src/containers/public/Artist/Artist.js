import clsx from 'clsx'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

import styles from './Artist.module.scss'
import * as apis from '../../../apis'
import { IntroduceArtist } from '../../../companents/IntroduceArtist'
import { NewReleaseArtist } from '../../../companents/NewReleaseArtist'
import { LinkAll } from '../../../companents/LinkAll'
import { Songs } from '../../../companents/Songs'
import { Theme } from '../../../companents/Theme'
import { Artists } from '../../../companents/Artists'

function Artist() {
    const { name } = useParams()
    const [ data, setData ] = useState(null)
    const [ songs, setSongs ] = useState(null)
    const [ playlists, setPlaylist ] = useState(null)
    const [ artists, setActists] = useState(null)
    const ref = useRef()

    useEffect(() => {
        async function fetchArtist() {
            const response = await apis.getArtist(name)

            setData(response?.data?.data)
            setSongs(response?.data?.data?.sections?.find(item => item.sectionType === 'song'))
            setPlaylist(response?.data?.data?.sections?.filter(item => item.sectionType === 'playlist'))
            setActists(response?.data?.data?.sections?.find(item => item.sectionType === 'artist'))
        }

        fetchArtist()
    }, [name])

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"})
    }, [name])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.introduce)} ref={ref}>
                <IntroduceArtist data={data}/>
            </div>
            
            <div className={clsx(styles.wrapSection)}>
                {data?.topAlbum && 
                    <div>
                        <h2 className={clsx(styles.newReleaseText)}>Mới Phát Hành</h2>

                        <div classname={clsx(styles.newRelease)}>
                            <NewReleaseArtist data={data?.topAlbum}/>
                        </div> 
                    </div>
                }   

                <div className={clsx(styles.songs)}>
                    <div className={clsx(styles.wrapTitleSongs)}>
                        <h2 className={clsx(styles.titleSongsText)}>{songs?.title}</h2>
                        <LinkAll path={songs?.link}/>
                    </div>

                    <div className={clsx(styles.wrapSongs)}>
                        <Songs data={songs?.items}/>
                    </div>
                </div>
            </div>

            {playlists?.map(item => (
                <div 
                    className={clsx(styles.wrapPlaylists)}
                    key={item?.title}
                >
                    <Theme data={item}/>
                </div>
            ))}

            <div className={clsx(styles.artists)}>
                <h2 className={clsx(styles.newReleaseText)}>{artists?.title}</h2>

                <Artists data={artists?.items}/>
            </div>

            <div className={clsx(styles.wrapAboutArtist)}>
                <h2 className={clsx(styles.newReleaseText)}>{`Về ${data?.name}`}</h2>

                <div className={clsx(styles.aboutArtist)}>
                    <img src={data?.thumbnailM} className={clsx(styles.artistImg)}></img>

                    <div className={clsx(styles.content)}>
                        <p className={clsx(styles.description)} dangerouslySetInnerHTML={{ __html: data?.biography}}></p>

                        <div className={clsx(styles.statistic)}>
                            <div className={clsx(styles.inforAdd)}>
                                <span className={clsx(styles.number)}>{Number(data?.totalFollow.toFixed(1)).toLocaleString()}</span>
                                <span className={clsx(styles.text)}>Người quan tâm</span>
                            </div>

                            {data?.awards?.length > 0 && 
                                <div className={clsx(styles.inforAdd)}>
                                    <span className={clsx(styles.number)}>{data?.awards?.length}</span>
                                    <span className={clsx(styles.text)}>Giải thưởng</span>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default Artist