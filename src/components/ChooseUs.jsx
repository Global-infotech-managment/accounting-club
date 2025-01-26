import React, { useState, useRef } from 'react'
import { choosUsContent } from '../utils/helper'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Icons from './common/Icons'
import ChooseUsCard from './ChooseUsCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

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
    <section className="px-3 xl:px-0">
      <div className="container rounded-6 bg-primary py-16 lg:max-w-[1184px] xl:px-8">
        <Heading
          className="mb-3 text-center !text-white xl:mb-4"
          middleText="Why Choose Us?"
        />
        <Paragraph
          className="mx-auto max-w-[590px] text-center !text-white"
          text="We are offering world's most advanced courses in Accounting and Indian Taxation with some unique features"
        />
        <div className="mt-6 flex items-center justify-center gap-5">
          {choosUsContent.map((obj, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(obj.btnText, i)}
              className={`rounded-1 border px-6 py-2 font-medium !leading-[133%] duration-300 hover:!bg-white hover:!text-primary max-sm:w-full sm:h-[52px] sm:py-[14px] sm:text-lg ${
                activeBtn === obj.btnText
                  ? 'border-[transparent] bg-white text-primary'
                  : '!border-white !bg-primary text-white'
              } `}
            >
              {obj.btnText}
            </button>
          ))}
        </div>
        <div className="mx-auto my-10 h-[0.5px] max-w-[964px] bg-white"></div>
        <div className="flex items-center gap-7">
          <span
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="group flex h-10 w-10 min-w-10 cursor-pointer items-center justify-center rounded-1 border border-white duration-300 hover:bg-white"
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
              768: { slidesPerView: 2 },
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
            className="group flex h-10 w-10 min-w-10 rotate-180 cursor-pointer items-center justify-center rounded-1 border border-white duration-300 hover:bg-white"
          >
            <Icons iconName={'btnArrow'} />
          </span>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {choosUsContent.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                activeIndex === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChooseUs
