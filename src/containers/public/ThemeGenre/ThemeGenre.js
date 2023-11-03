import clsx from 'clsx'
import { useSelector } from 'react-redux'

import styles from './ThemeGenre.module.scss'
import { Theme } from '../../../companents/Theme'

function ThemeGenre() {
    const { theme } = useSelector(state => state.app)

    return (
        <div className={clsx(styles.container)}>
            {theme?.map((item, index) => (
                <div className={styles.wrapTheme} key={index}><Theme data={item}/></div>
            ))}
        </div>
    )
}

export default ThemeGenre