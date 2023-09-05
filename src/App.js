import { useSelector, useDispatch } from 'react-redux'


function App() {
  const { test } = useSelector(state => state.app)
  console.log(test)

  return ( 
    <h1>App</h1>
  )
}

export default App