import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useUser } from './context/userContext'
import Login from './components/Login'
import Loading from './components/Loading'

function App() {

  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  const {user} = useUser()

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:id' element={<MovieDetails />} />
          <Route path='/movies/:id/:date' element={<SeatLayout />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/favourite' element={<Favourite />} />
          <Route path='/loading/:nextUrl' element={<Loading />} />
          <Route path='/admin/*' element={user ? <Layout /> : (<div className='min-h-screen flex justify-center items-center'><Login /></div>)}>
            <Route index element={<Dashboard />} />
            <Route path='add-shows' element={<AddShows />} />
            <Route path='list-shows' element={<ListShows />} />
            <Route path='list-bookings' element={<ListBookings />} />
          </Route>
          
        </Routes>
        {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
