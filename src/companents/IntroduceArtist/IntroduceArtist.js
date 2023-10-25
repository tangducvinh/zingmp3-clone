import clsx from 'clsx'

import styles from './IntroduceArtist.module.scss'
import icons from '../../ultis/icon'
import { Button } from '../Button'
import { handleNumber } from '../../ultis/func'

function IntroduceArtist({data}) {
    const { HiPlay, SlUserFollow } = icons 

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.wrapIntroduce)}>
                <img className={clsx(styles.img)} src={data?.thumbnail}></img>

                <div className={clsx(styles.wrapContent)}>
                    <div className={clsx(styles.wrapTop)}>
                        <h1 className={clsx(styles.artistName)}>{data?.name}</h1>
                        <span className={clsx(styles.wrapIcon)}><HiPlay size={25} color={'white'}/></span>
                    </div>

                    <div className={clsx(styles.wrapBottom)}>
                        <span className={clsx(styles.care)}>{handleNumber(data?.totalFollow)}</span>
                        <div className={clsx(styles.careBtn)}>
                            <Button sizeM item={{text: 'QUAN TÂM', icon: <SlUserFollow />}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroduceArtist