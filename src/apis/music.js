import axios from '../axios'

export function getSong(sid) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/song',
                method: 'get',
                params: { id: sid }
            })
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

export function getDetailSong(sid) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                url: '/infosong',
                method: 'get',
                params: {id: sid}
            })
            resolve(response)
        } catch(error) {
            reject(error)
        }
    })
}

export function getDetailtPlaylist(sid) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios ({
                url: '/detailplaylist',
                methodl: 'get',
                params: {id: sid}
            })
            resolve(response)
        } catch(error) {
            reject(error)
        }
    })
}

export function search(value) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios ({
                url: '/search',
                methodl: 'get',
                params: {keyword: value}
            })
            resolve(response)
        } catch(error) {
            reject(error)
        }
    })
}