import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './utils/PrivateRoutes'
import ScheduleCalendar from './pages/Dashboard/ScheduleCalendar'
import Summary from './pages/Dashboard/Summary'
import Schedules from './pages/Dashboard/Schedules'
import Organizations from './pages/Dashboard/Organizations'
import EditOrganization from './pages/Dashboard/EditOrganization'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Booking from './pages/Booking/Booking'
import AboutUs from './pages/AboutUs'
import Bookings from './pages/Dashboard/Bookings'
import Services from './pages/Dashboard/Services'
import ServiceDetails from './pages/Dashboard/ServiceDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/dashboard' element={<PrivateRoutes><Dashboard/></PrivateRoutes>}>
          <Route index element={<Summary/>}></Route>
          <Route path='/dashboard/bookings' element={<Bookings/>}></Route>
          <Route path='/dashboard/services' element={<Services/>}></Route>
          <Route path='/dashboard/serviceDetails/:id' element={<ServiceDetails/>}></Route>
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