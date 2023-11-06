import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'

import styles from './ThemeGenre.module.scss'
import { Theme } from '../../../companents/Theme'
import { BiRefresh } from 'react-icons/bi'

function ThemeGenre() {
    const { theme } = useSelector(state => state.app)
    const ref = useRef()

    useEffect(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, [])

    return (
        <div className={clsx(styles.container)}>
            <div ref={ref}></div>

            {theme?.map((item, index) => (
                <div className={styles.wrapTheme} key={index}><Theme data={item}/></div>
            ))}
        </div>
    )
}

export default ThemeGenre