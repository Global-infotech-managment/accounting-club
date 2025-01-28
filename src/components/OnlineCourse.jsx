import React, { useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import Icons from './common/Icons'
import { Link } from 'react-router-dom'
import { onlineCourse } from '../utils/helper'
import OnlineBook from '../assets/images/png/online-book.png'
import { EffectFade, Autoplay } from 'swiper/modules'
import Button from './common/Button'

const OnlineCourse = () => {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isShowMore, setIsShowMore] = useState(false)

  const handleDotClick = (index) => {
    swiperRef.current?.swiper.slideTo(index)
    setActiveIndex(index)
  }

  const toggleShowMore = () => {
    setIsShowMore((prev) => !prev)
  }

  return (
    <div className="relative" id="course-info">
      <div className="container relative z-20 px-3 py-16 md:py-24 lg:max-w-[1184px] lg:py-[120px]">
        <Heading
          className="lg:text-center"
          middleText="Online"
          lastText="Courses"
        />
        <Paragraph
          className="mb-4 mt-3 sm:mt-4 md:mb-6 lg:mx-auto lg:mb-10 lg:max-w-[619px] lg:text-center"
          text="Be an Accounting and taxation expert in few days even if you don't have any Accounting background. Choose a program as per your requirement"
        />
        {isShowMore ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {onlineCourse.map((obj, index) => (
              <div
                key={index}
                className="rounded-5 border border-black border-opacity-5 bg-white p-4 max-sm:min-h-[208px] sm:p-6 md:min-h-[231px] lg:min-h-[246px] xl:min-h-[224px]"
              >
                <h2 className="leading-150 flex items-center gap-2 text-xl font-semibold">
                  <Icons iconName={obj.iconName} />
                  {obj.title}
                </h2>
                <div className="mt-2 flex items-start gap-5">
                  <img
                    width={23}
                    height={84}
                    src={obj.levelImg}
                    alt={obj.title}
                  />
                  <div>
                    <Paragraph
                      className="mb-3 lg:max-w-[274px]"
                      text={obj.desc}
                    />
                    <Link className="text-[#3574E1] underline" to={'/'}>
                      {obj.readMore}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            breakpoints={{
              1024: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              320: { slidesPerView: 1, spaceBetween: 10 },
            }}
            ref={swiperRef}
            modules={[EffectFade, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            fadeEffect={{ crossFade: true }}
          >
            {onlineCourse.map((obj, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-5 border border-black border-opacity-5 bg-white p-4 max-sm:min-h-[208px] sm:p-6 md:min-h-[231px] lg:min-h-[246px] xl:min-h-[224px]">
                  <h2 className="leading-150 flex items-center gap-2 text-xl font-semibold">
                    <Icons iconName={obj.iconName} />
                    {obj.title}
                  </h2>
                  <div className="mt-2 flex items-start gap-5">
                    <img
                      width={23}
                      height={84}
                      src={obj.levelImg}
                      alt={obj.title}
                    />
                    <div>
                      <Paragraph
                        className="mb-3 lg:max-w-[274px]"
                        text={obj.desc}
                      />
                      <Link className="text-[#3574E1] underline" to={'/'}>
                        {obj.readMore}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* dots */}
        {/* <div className="custom-pagination mt-4 flex w-full justify-center sm:mt-6 md:!mt-10">
          {!isShowMore &&
            onlineCourse.map((_, index) => (
              <span
                key={index}
                className={`dot ${activeIndex === index ? 'dot-active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
        </div> */}
        <div className="mt-6 flex items-center justify-center text-center">
          <Button
            onClick={toggleShowMore}
            bgBtn={isShowMore ? 'Show Less' : 'Show More'}
          />
        </div>
      </div>
      <img
        className="pointer-events-none absolute right-0 top-0 z-0 max-sm:-top-20 max-sm:w-[150px]"
        src={OnlineBook}
        alt="online book"
      />
    </div>
  )
}

export default OnlineCourse
