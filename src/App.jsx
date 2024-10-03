import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import ScheduleCalendar from './pages/Dashboard/ScheduleCalendar'
import Summary from './pages/Dashboard/Summary'
import Schedules from './pages/Dashboard/Schedules'
import Organizations from './pages/Dashboard/Organizations'
import EditOrganization from './pages/Dashboard/EditOrganization'
import Booking from './pages/Booking'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/booking' element={<Booking/>}/>
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