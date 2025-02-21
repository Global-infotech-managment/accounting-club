'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import aartiInstitute from '../../assets/images/png/aarti-institute.png'
import shipWay from '../../assets/images/png/shipway.png'
import tataSteel from '../../assets/images/png/tata-steel.png'
import storia from '../../assets/images/png/storia.png'
const TrustedBy = () => {
  const brands = [aartiInstitute, shipWay, tataSteel, storia]

  return (
    <div className="container relative mt-[110px] w-full overflow-hidden px-3 lg:max-w-[1184px]">
      <p className="mb-10 text-center text-[28px] font-medium leading-normal text-primary">
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
        slidesPerView={5}
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
      >
        {[...brands, ...brands].map((src, index) => (
          <SwiperSlide key={index} className="py-3">
            <div className="shadow-trusted flex min-h-20 items-center justify-center rounded-lg px-[36px] py-4">
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
  )
}

export default TrustedBy
