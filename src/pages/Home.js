import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Dropdown from './Dropdown'
import Information from './Information'

const Home = () => {
  const [dropdownValue,setDropdownValue] = React.useState('')
  const state = useSelector(state => state.changeSession)
  const history = useHistory()
  useEffect(() => {
    if (state) {
      if (!state.isLoggedIn) {
        history.push('/')
      }
    } else {
    }
  }, [state,history]);
  return (
    <div>
      <Dropdown dropdownValue={dropdownValue} setDropdownValue={setDropdownValue}/>
      <Information dropdownValue={dropdownValue}/>
    </div>
  )
}


export default Home
