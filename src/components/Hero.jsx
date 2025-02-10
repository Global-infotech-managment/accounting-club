import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import Button from './common/Button'
import { EffectFade, Autoplay } from 'swiper/modules'
import HeroEllipse from '../assets/images/png/hero-img-ellipse.png'
import HeroEllipseSecond from '../assets/images/png/second-hero-ellipse.png'
import BookImage from '../assets/images/png/book.png'
import { slides } from '../utils/helper'
import { ABOUT_ROUTE, TELEPHONE_NUMBER } from '../utils/constant'

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const handleDotClick = (index) => {
    swiperRef.current.swiper.slideTo(index)
    setActiveIndex(index)
  }
  const locationPath = window.location.pathname
  return (
    <div className="relative">
      <div className="container relative mt-12 w-full px-3 sm:mt-16 md:mt-24 lg:mt-[129px] lg:max-w-[1184px]">
        <img
          className="pointer-events-none absolute -top-10 right-5 z-0 max-lg:hidden xl:-right-[60px]"
          src={HeroEllipse}
          alt="hero ellipse"
        />
        <div className="xl:-mr-12">
          <Swiper
            effect="fade"
            className="hero-slider relative z-40"
            modules={[EffectFade, Autoplay]}
            spaceBetween={50}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            fadeEffect={{ crossFade: true }}
            onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
            ref={swiperRef}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-6">
                  <div className="relative z-10">
                    <h1 className="text-3xl font-bold !leading-[132%] md:text-4xl lg:text-5xl xl:text-[56px]">
                      {slide.title}
                    </h1>
                    <p className="mt-3 text-light-black max-sm:text-sm md:mt-4 lg:max-w-[535px]">
                      {slide.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-4 sm:mt-6 sm:items-center sm:gap-5 md:mt-8 lg:mt-10">
                      {locationPath === '/' ? (
                        <>
                          <Button
                            className="max-sm:px-3 max-sm:py-2 max-sm:text-center"
                            bgBtn="Know More"
                            path={ABOUT_ROUTE}
                          />
                          <Button
                            className="max-sm:px-3 max-sm:py-2 max-sm:text-center"
                            transparentBtn="Request Callback"
                            path={TELEPHONE_NUMBER}
                          />
                        </>
                      ) : (
                        <Button
                          className="max-sm:px-3 max-sm:py-2 max-sm:text-center"
                          bgBtn="Start Learning Now"
                          path={ABOUT_ROUTE}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-full rounded-[24px] border border-primary shadow-hero-image lg:max-w-[582px] xl:h-[455px]"
                      src={slide.image}
                      alt={slide.title}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-end">
          <div className="custom-pagination mt-5 flex w-full justify-center xl:max-w-[486px]">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${activeIndex === index ? 'dot-active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <img
        className="pointer-events-none absolute -top-5 left-0 z-0"
        src={BookImage}
        alt="book ellipse"
      />
      <img
        className="absolute -bottom-7 left-0 max-xl:hidden"
        src={HeroEllipseSecond}
        alt="hero ellipse"
      />
    </div>
  )
}

export default Hero
