import React from 'react'
import Banner from '../../components/Banner/Banner'
import Appointment from '../../components/Appointment/Appointment'
import Process from '../../components/Process/Process'
import TopDoctors from '../../components/TopDoctors/TopDoctors'
function Home() {
  return (
    <>
        <Banner/>
        <Process/>
        <TopDoctors/>
    </>
  )
}

export default Home