import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import path from './ultis/path'
import { Home } from './containers/public/Home'
import { Login } from './containers/public/Login'
import { Public } from './containers/public/Public'
import { Album } from './containers/public/Album'  
import * as actions from './store/action'
import { NewRelease } from './containers/public/NewRelease'
import { WeekChart } from './containers/public/WeekChart'
 
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getHome())
  }, [])

  return ( 
    <div className="app">
      <Routes>
        <Route path={path.PUBLIC} element={ <Public /> }>
          <Route path={path.WEEKCHART} element={ <WeekChart /> } />
          <Route path={path.NEW_RELEASE} element={ <NewRelease />} />
          <Route path={path.PLAYLIST_TITLE_PID} element={ <Album /> }/>
          <Route path={path.ALBUM_TITLE_ID} element={ <Album /> }/>
          <Route path={path.HOME} element={ <Home /> }/>
          <Route path={path.LOGIN} element={ <Login /> }/>
        </Route>

      </Routes>
    </div>
  )
}

export default App