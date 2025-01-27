import React, { useState, useRef } from 'react'
import { choosUsContent } from '../utils/helper'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Icons from './common/Icons'
import ChooseUsCard from './ChooseUsCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import StudentEllipse from "../assets/images/png/second-hero-ellipse.png"
import ChooseEllipse from '../assets/images/png/footer-ellipse.png'
import LeftBottomImg from '../assets/images/png/choose-left-bottom.png'
import RightTopImg from '../assets/images/png/choose-right-top.png'


const ChooseUs = () => {
  const [activeBtn, setActiveBtn] = useState('Free Classes')
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index)
      setActiveIndex(index)
    }
  }

  const handleSlideChange = (swiper) => {
    const realIndex = swiper.realIndex
    const visibleSlide = choosUsContent[realIndex]
    if (visibleSlide) {
      setActiveBtn(visibleSlide.btnText)
    }
    setActiveIndex(realIndex)
  }

  const handleButtonClick = (btnText, index) => {
    setActiveBtn(btnText)
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  return (
    <section className="px-3 xl:px-0 relative">
      <div className="container rounded-6 bg-primary px-3 py-8 sm:py-10 md:py-12 lg:py-16 sm:px-4 lg:max-w-[1184px] lg:px-5 xl:px-8 relative z-20">
        <Heading
          className="mb-3 text-center !text-white xl:mb-4"
          middleText="Why Choose Us?"
        />
        <Paragraph
          className="mx-auto max-w-[590px] text-center !text-white"
          text="We are offering world's most advanced courses in Accounting and Indian Taxation with some unique features"
        />
        <div className="mt-6 flex items-center gap-4 overflow-x-auto whitespace-nowrap sm:justify-center lg:gap-5">
          {choosUsContent.map((obj, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(obj.btnText, i)}
              className={`rounded-1 border px-4 py-3 text-sm font-medium !leading-[133%] duration-300 hover:!bg-white hover:!text-primary max-sm:w-full md:h-[52px] md:px-6 md:py-[14px] md:text-base xl:text-lg ${activeBtn === obj.btnText
                ? 'border-[transparent] bg-white text-primary'
                : '!border-white !bg-primary text-white'
                } `}
            >
              {obj.btnText}
            </button>
          ))}
        </div>
        <div className="mx-auto my-8 h-[0.5px] bg-white md:max-w-[85%] xl:my-10 xl:max-w-[964px]"></div>
        <div className="flex items-center gap-4 xl:gap-7">
          <span
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="group hidden h-7 min-w-7 cursor-pointer items-center justify-center rounded-1 border border-white duration-300 hover:bg-white sm:flex lg:h-10 lg:min-w-10"
          >
            <Icons iconName={'btnArrow'} />
          </span>

          <Swiper
            ref={swiperRef}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            className="max-w-[964px]"
            onSlideChange={handleSlideChange}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 16 },
            }}
          >
            {choosUsContent.map((obj, i) => (
              <SwiperSlide className="h-full" key={i}>
                <ChooseUsCard obj={obj} i={i} />
              </SwiperSlide>
            ))}
          </Swiper>

          <span
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="group hidden h-7 min-w-7 rotate-180 cursor-pointer items-center justify-center rounded-1 border border-white duration-300 hover:bg-white sm:flex lg:h-10 lg:min-w-10"
          >
            <Icons iconName={'btnArrow'} />
          </span>
        </div>
        <div className="mt-6 flex justify-center gap-2 xl:mt-10">
          {choosUsContent.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-colors ${activeIndex === index ? 'bg-white' : 'bg-white/40'
                }`}
            />
          ))}
        </div>
        <img className="absolute bottom-0 pointer-events-none left-0 max-xl:w-24" src={LeftBottomImg} alt="student ellipse" />
        <img className="absolute top-0 pointer-events-none right-0 max-xl:w-24" src={RightTopImg} alt="right top ellipse" />
      </div>
      <img className="absolute top-0 pointer-events-none left-0 max-xl:hidden" src={StudentEllipse} alt="left bottom ellipse" />
      <img className="pointer-events-none absolute right-0 bottom-0 z-0 max-xl:hidden" src={ChooseEllipse} alt="footer ellipse" />
    </section>
  )
}

export default ChooseUs