import clsx from 'clsx'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { useNavigate, createSearchParams } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { useDebounce } from 'use-debounce'

import styles from './Header.module.scss'
import icons from '../../ultis/icon'
import { Sevice } from './Sevice'
import * as apis from '../../apis'
import * as actions from '../../store/action'
import path from '../../ultis/path'
import { SearchInfor } from '../SearchInfor'

const { HiOutlineArrowLeft, HiOutlineArrowRight, TfiSearch, MdOutlineClear } = icons

function Header() {
    const [ keyword, setKeyword ] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputElement = useRef()
    const [ showInforSearch, setShowInforSearch ] = useState(false)
    const [ valueCurrent ] = useDebounce(keyword, 500)
    const [ dataSongs, setDataSongs ] = useState() 

    async function handleFetchApi(data) {
        navigate({
            pathname: `/${path.SEARCH}${path.ALL}`,
            search: createSearchParams({
                q: data
            }).toString()
        })
        setShowInforSearch(false)
        dispatch(actions.setHistoryKeyword(data))
        dispatch(actions.setLoadingSearch(true))
        const response = await apis.search(data)
        dispatch(actions.setLoadingSearch(false))
        dispatch(actions.setDataSearch(response))
    }

    async function handleSearch(e) {
        if (e.keyCode === 13 && keyword.trim()) {
            handleFetchApi(keyword)
        }
    }

    function handleClearText() {
        setKeyword('')
        inputElement.current.focus()
    }

    const handleSetkeyword = useCallback( async(value) => {
        setKeyword(value)
        handleFetchApi(value)
    }, [])

    async function fecthDataSearch() {
        const response = await apis.search(valueCurrent)
        if (response.data.err === 0) {
            setDataSongs(response.data.data)
        }
    }

    useEffect(() => {
        fecthDataSearch()
    }, [valueCurrent])

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.search)}>
                <button 
                    className={clsx(styles.btnLeft)}
                    onClick={() => navigate(-1)}
                >
                    <HiOutlineArrowLeft size={21}/>
                </button>

                <button 
                    className={clsx(styles.btnRight)}
                    onClick={() => navigate(1)}
                >
                    <HiOutlineArrowRight size={21}/>
                </button>

                <Tippy
                    visible={showInforSearch}
                    offset={[0, 0]}
                    interactive
                    render={attrs => (
                        <div className={clsx(styles.searchInfor)} tabIndex="-1" {...attrs}>
                            <SearchInfor onSetData={handleSetkeyword} onSetShowSearch={setShowInforSearch} dataArtist={dataSongs?.artists?.[0]} dataSongs={dataSongs?.songs} keywordLive={keyword}/>
                        </div>
                    )}
                    onClickOutside={() => setShowInforSearch(false)}
                >
                    <div 
                        className={clsx(styles.formSeach, {[styles.formSearchActive]: showInforSearch})}
                        onClick={() => setShowInforSearch(true)}
                    >
                        <i className={clsx(styles.iconSearch)}><TfiSearch size={20} /></i>
                        <input 
                            className={clsx(styles.inputSearch)} 
                            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyUp={handleSearch}
                            ref={inputElement}
                        >
                        </input>

                        <span 
                            className={clsx(styles.clearIcon, {[styles.active]: keyword})}
                            onClick={handleClearText}
                        > <MdOutlineClear size={20}/> </span>
                    </div>
                </Tippy>
            </div>

            <div className={clsx(styles.user)}>
                {<Sevice />}
                
                <button className={clsx(styles.avatar)}>
                    <img className={clsx(styles.imgAvatar)} src='https://toigingiuvedep.vn/wp-content/uploads/2022/11/hinh-anh-avatar-cute-de-thuong.jpg' alt='avatar'></img>
                </button>
            </div>
        </div>
    )
    
}

export default Header