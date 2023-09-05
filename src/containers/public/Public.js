import { Outlet } from 'react-router-dom'

function Public() {
    return (
        <div>
            <h2>This is public page</h2>

            <Outlet />
        </div>
    )

}

export default Public