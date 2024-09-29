import React from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import ScheduleCalendar from './components/Dashboard/ScheduleCalendar'
import Summary from './components/Dashboard/Summary'
import Schedules from './components/Dashboard/Schedules'
import Organizations from './components/Dashboard/Organizations'
import EditOrganization from './components/Dashboard/EditOrganization'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}>
          <Route index element={<Summary/>}></Route>
          <Route path='/dashboard/organizations' element={<Organizations/>}></Route>
          <Route path='/dashboard/organizations/:id' element={<EditOrganization/>}></Route>
          <Route path='/dashboard/schedules' element={<Schedules/>}></Route>
          <Route path='/dashboard/calendar' element={<ScheduleCalendar/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App