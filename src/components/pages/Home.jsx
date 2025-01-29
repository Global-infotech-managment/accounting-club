import React from 'react'
import Hero from '../Hero'
import CompanyRank from '../CompanyRank'
import AboutUs from '../AboutUs'
import ChooseUs from '../ChooseUs'
import StudentSay from '../StudentSay'
import OnlineCoursesSell from '../OnlineCoursesSell'

const Home = () => {
  return (
    <>
      <div className="overflow-hidden">
        <Hero />
        <CompanyRank />
      </div>
      <AboutUs />
      <OnlineCoursesSell />
      <ChooseUs />
      <StudentSay />
    </>
  )
}

export default Home
