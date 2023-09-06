import { useSelector, useDispatch } from 'react-redux'
import {Routes, Route} from 'react-router-dom'

import path from './ultis/path'
import { Home } from './containers/public/Home'
import { Login } from './containers/public/Login'
import { Public } from './containers/public/Public'
 
function App() {
  return ( 
    <div className="app">
      <Routes>
        <Route path={path.PUBLIC} element={ <Public />}>
          <Route path={path.HOME} element={ <Home />}/>
          <Route path={path.LOGIN} element={ <Login />}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App