import { useSelector } from 'react-redux'
import clsx from 'clsx'

import styles from './Slider.module.scss'

function Slider() {

    const { banner } = useSelector(state => state.app)

    return (
        <div className={clsx(styles.container)}>
            {banner.map(item => (
                <div 
                    key={item.encodeId}
                    className={clsx(styles.wrrapImg)}
                >
                    <img className={clsx(styles.img)} src={item.banner}></img>
                </div>
            ))}
        </div>
    )
    
}


export default Slider