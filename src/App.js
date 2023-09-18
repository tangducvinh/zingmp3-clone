import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import path from './ultis/path'
import { Home } from './containers/public/Home'
import { Login } from './containers/public/Login'
import { Public } from './containers/public/Public'
import { Album } from './containers/public/Album'  
import * as actions from './store/action'
 
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getHome())
  }, [])

  return ( 
    <div className="app">
      <Routes>
        <Route path={path.PUBLIC} element={ <Public />}>
          <Route path={path.PLAYLIST_TITLE_PID} element={ <Album />}/>
          <Route path={path.HOME} element={ <Home />}/>
          <Route path={path.LOGIN} element={ <Login />}/>
        </Route>

      </Routes>
    </div>
  )
}

export default App