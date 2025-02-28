import React from 'react'
import Hero from '../Hero'
import AboutUs from '../AboutUs'
import ChooseUs from '../ChooseUs'
import StudentSay from '../StudentSay'
import OnlineCoursesSell from '../OnlineCoursesSell'
import HeroNew from '../common/HeroNew'
import TrustedBy from '../common/TrustedBy'

const Home = () => {
  const path = window.location.pathname
  return (
    <>
      <div className="overflow-hidden">
        <Hero />
      </div>
      <TrustedBy />
      <AboutUs />
      <OnlineCoursesSell />
      <ChooseUs />
      <StudentSay />
    </>
  )
}

export default Home
