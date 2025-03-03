'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import aartiInstitute from '../../assets/images/png/aarti-institute.png'
import shipWay from '../../assets/images/png/shipway.png'
import tataSteel from '../../assets/images/png/tata-steel.png'
import storia from '../../assets/images/png/storia.png'
import rightEllips from '../../assets/images/png/trusted-right-linear.png'
const TrustedBy = () => {
  const brands = [aartiInstitute, shipWay, tataSteel, storia]

  return (
    <div className="relative">
      <img
        src={rightEllips}
        alt="liner"
        className="pointer-events-none absolute start-0 -z-10 max-h-[257px] w-full max-w-[100px]"
      />

      <div className="container relative mt-[50px] w-full overflow-hidden px-3 sm:mt-16 lg:mt-[110px] lg:max-w-[1184px]">
        <p className="lg:mb-10 md:mb-8 sm:mb-6 mb-2 text-center text-[20px] font-medium leading-normal text-primary md:text-[26px] lg:text-[28px]">
          Trusted by{' '}
          <span className="rounded-[10px] bg-primary px-2 leading-normal text-white">
            6000+
          </span>{' '}
          Tax Professionals & CAs!
        </p>
        {/* Swiper Infinite Scrolling */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            stopOnLastSlide: false,
          }}
          allowTouchMove={false}
          freeMode={true}
          freeModeMomentum={false}
          breakpoints={{
            320: { slidesPerView: 2 }, // Small screens
            480: { slidesPerView: 3 }, // Medium screens
            768: { slidesPerView: 4 }, // Tablets
            1024: { slidesPerView: 5 }, // Desktops
            1280: { slidesPerView: 6 }, // Large desktops
          }}
        >
          {[...brands, ...brands].map((src, index) => (
            <SwiperSlide key={index} className="py-3">
              <div className="flex min-h-20 items-center justify-center rounded-lg px-[36px] py-4 shadow-trusted">
                <img
                  src={src}
                  alt={`Brand ${index + 1}`}
                  className={`mx-auto max-h-[50px] w-full max-w-[130px] object-fill ${src === storia && 'max-w-[60px]'}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TrustedBy
