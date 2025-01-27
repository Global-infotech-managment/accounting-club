import React from 'react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import RedArrow from '../assets/images/png/red-arrow.png'
import { studentData } from '../utils/helper'
import StudentEllipse from "../assets/images/png/second-hero-ellipse.png"

const StudentSay = () => {
    return (
        <div className='relative'>
            <div className='container lg:max-w-[1148px] px-3 pt-16 md:pt-24 lg:pt-[120px] relative z-20 flex items-center justify-between gap-8 sm:gap-10 lg:gap-6 max-lg:flex-col'>
                <div className='lg:max-w-[512px] w-full'>
                    <div className='w-full relative'>
                        <img className='max-sm:hidden absolute z-0 right-32 -top-8 md:right-4 xl:-right-12 md:-top-12 lg:top-0 max-md:max-w-[100px]' src={RedArrow} alt="red arrow" />
                        <Heading className="lg:max-w-[326px] relative z-30" firstText="What Our" middleText="Student" lastText="Says" />
                    </div>
                    <Paragraph className="sm:mt-3 mt-2 md:mt-4" text="Accountants Club transformed my career with practical training. The expert guidance and unique techniques made learning accounting effortless and enjoyable!" />
                    <Button className="mt-4 sm:mt-6 md:mt-8 lg:mt-10" bgBtn="View More" />
                </div>
                <div className="lg:max-w-[481px] w-full">
                    {studentData.map((obj, index) => (
                        <div
                            key={index}
                            className={`${index === 1 ? 'mt-4 sm:mt-6' : ''} border border-black border-opacity-5 bg-white rounded-5 p-4 sm:px-6 sm:py-[22px]`}>
                            <h2 className="font-semibold text-xl leading-150 flex items-center gap-2">{obj.title}</h2>
                            <Paragraph className="mt-2" text={obj.text} />
                            <div className="flex justify-between items-center">
                                <div className="!leading-150 text-light-black text-sm font-normal flex items-center mt-2 gap-2">
                                    <img width={32}
                                        height={32}
                                        src={obj.profileImg}
                                        alt="profile image"
                                    />
                                    {obj.name}
                                </div>
                                <img className='max-sm:w-10' width={58} height={54} src={obj.stopSymbol} alt="stop image" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <img className="absolute bottom-72 pointer-events-none left-0 max-xl:hidden" src={StudentEllipse} alt="student ellipse" />
        </div>
    )
}

export default StudentSay