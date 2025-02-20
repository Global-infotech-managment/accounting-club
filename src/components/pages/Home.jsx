import React from 'react'
import Hero from '../Hero'
import CompanyRank from '../CompanyRank'
import AboutUs from '../AboutUs'
import ChooseUs from '../ChooseUs'
import StudentSay from '../StudentSay'
import OnlineCoursesSell from '../OnlineCoursesSell'
import HeroNew from '../common/HeroNew'

const Home = () => {
  const path = window.location.pathname
  return (
    <>
      <div className="overflow-hidden">
        {path === '/' ? <HeroNew /> : <Hero />}

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
