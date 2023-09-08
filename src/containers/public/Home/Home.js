import { useEffect } from 'react'

import * as apis from '../../../apis'

function Home() {
    useEffect(() => {
        const fetchDataHome = async () => {
            const response = await apis.getHome()
            console.log(response)
        }

        fetchDataHome()
    }, [])

    return (
        <div>
            <h2>This is home page</h2>
        </div>
    )

}

export default Home