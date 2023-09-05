import { Outlet } from 'react-router-dom'

import { SidebarLeft } from '../../companents/SidebarLeft'
import { SidebarRight } from '../../companents/SidebarRight'

function Public() {
    return (
        <div>
            <div>
                <SidebarLeft />
            </div>
            
            <div>
                <Outlet />
            </div>

            <div>
                <SidebarRight />
            </div>

        </div>
    )

}

export default Public