import React from 'react'
import AboutUsImg from '../assets/images/png/about-us.png'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import AboutUsEllipse from '../assets/images/png/about-inside-ellipse.png'
import AboutUsEllipseBottom from '../assets/images/png/about-us-ellipse-bottom.png'

const AboutUs = () => {
    return (
        <div className='container lg:max-w-[1184px] px-3 w-full mt-16 md:mt-24 lg:mt-[140px] relative'>
            <div className='p-4 sm:p-6 md:p-10 rounded-6 bg-light-thin flex justify-between items-center max-lg:flex-col-reverse relative gap-10 lg:gap-6'>
                <div className='w-full'>
                    <img className='lg:max-w-[492px] w-full' src={AboutUsImg} alt="about us" />
                </div>
                <div className='lg:max-w-[523px] w-full relative z-20'>
                    <Heading middleText="About" lastText="Us" />
                    <Paragraph className="mt-2 sm:mt-3" text="Accountants Club is one of the leading accounting training institutes in India, with extensive experience and expertise in successfully training thousands of students. Established in 1999, we have been consistently delivering quality education to aspiring accounting professionals." />
                    <Paragraph className="mt-[10px]" text="Our courses in Accounting, Tally, Taxation, GST, Income Tax, TDS, and Payrolls are based on a unique methodology developed through over 20 years of..." />
                    <Button className="mt-4 md:mt-6 lg:mt-10" transparentBtn="Read more" />
                </div>
                <img className='absolute bottom-0 right-0 z-0 pointer-events-none' src={AboutUsEllipse} alt="ellipse" />
            </div>
            <img className='absolute -bottom-10 max-lg:hidden left-4 xl:-left-7 -z-[1] pointer-events-none' src={AboutUsEllipseBottom} alt="ellipse" />
        </div>
    )
}

export default AboutUs