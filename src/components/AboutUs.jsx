import React from 'react'
import AboutUsImg from '../assets/images/png/about-us.png'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import AboutUsEllipse from '../assets/images/png/about-inside-ellipse.png'
import AboutUsEllipseBottom from '../assets/images/png/about-us-ellipse-bottom.png'
import { ABOUT_ROUTE } from '../utils/constant'

const AboutUs = () => {
  return (
    <div
      className="container relative w-full px-3 pt-16 md:pt-24 lg:max-w-[1184px] lg:pt-[140px]"
      id="about-us"
    >
      <div className="rounded-6 relative flex items-center justify-between gap-10 bg-light-thin p-4 max-lg:flex-col-reverse sm:p-6 lg:gap-6 lg:p-10">
        <div className="w-full">
          <img
            className="w-full lg:max-w-[492px]"
            src={AboutUsImg}
            alt="about us"
          />
        </div>
        <div className="relative z-20 w-full lg:max-w-[523px]">
          <Heading middleText="About" lastText="Us" />
          <Paragraph
            className="mt-2 sm:mt-3"
            text="Accountants Club is one of the leading accounting training institutes in India, with extensive experience and expertise in successfully training thousands of students. Established in 1999, we have been consistently delivering quality education to aspiring accounting professionals."
          />
          <Paragraph
            className="mt-[10px]"
            text="Our courses in Accounting, Tally, Taxation, GST, Income Tax, TDS, and Payrolls are based on a unique methodology developed through over 20 years of..."
          />
          <div className="flex items-center">
            <Button
              className="mt-4 md:mt-6 lg:mt-10"
              transparentBtn="Read more"
              path={ABOUT_ROUTE}
            />
          </div>
        </div>
        <img
          className="pointer-events-none absolute bottom-0 right-0 z-0"
          src={AboutUsEllipse}
          alt="ellipse"
        />
      </div>
      <img
        className="pointer-events-none absolute -bottom-10 left-4 -z-[1] max-lg:hidden xl:-left-7"
        src={AboutUsEllipseBottom}
        alt="ellipse"
      />
    </div>
  )
}

export default AboutUs
