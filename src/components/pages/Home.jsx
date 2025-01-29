import React from 'react'
import Hero from '../Hero'
import CompanyRank from '../CompanyRank'
import AboutUs from '../AboutUs'
import OnlineCourse from '../OnlineCourse'
import ChooseUs from '../ChooseUs'
import StudentSay from '../StudentSay'

const Home = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Hero />
        <CompanyRank />
      </div>
      <AboutUs />
      <OnlineCourse />
      <ChooseUs />
      <StudentSay />
    </>
  )
}

export default Home
