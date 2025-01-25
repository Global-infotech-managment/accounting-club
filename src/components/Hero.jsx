import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Button from "./common/Button";
import { EffectFade } from "swiper/modules";
import HeroEllipse from "../assets/images/png/hero-img-ellipse.png"
import HeroEllipseSecond from "../assets/images/png/second-hero-ellipse.png"
import BookImage from "../assets/images/png/book.png"
import { slides } from "../utils/helper";

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const handleDotClick = (index) => {
        swiperRef.current.swiper.slideTo(index);
        setActiveIndex(index);
    };

    return (
        <div className="relative">
            <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-[129px] container lg:max-w-[1184px] px-3 w-full relative">
                <img className="absolute -top-10 pointer-events-none z-0 right-5 max-lg:hidden xl:-right-7" src={HeroEllipse} alt="hero ellipse" />
                <Swiper effect="fade" className="hero-slider relative z-40" modules={[EffectFade]} spaceBetween={50}
                    slidesPerView={1} fadeEffect={{ crossFade: true }}
                    onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)} ref={swiperRef}>
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center relative">
                                <div className="relative z-10">
                                    <h1 className="leading-[132%] font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[56px]">{slide.title}</h1>
                                    <p className="text-light-black max-sm:text-sm mt-3 md:mt-4 lg:max-w-[535px]">
                                        {slide.description}</p>
                                    <div className="flex max-sm:flex-col items-center gap-4 sm:gap-5 mt-5 sm:mt-6 md:mt-8 lg:mt-10">
                                        <Button className='max-sm:w-full max-sm:text-center' bgBtn="Know More" />
                                        <Button className='max-sm:w-full max-sm:text-center' transparentBtn="Request Callback" />
                                    </div>
                                </div>
                                <img className="lg:max-w-[582px] w-full" src={slide.image} alt={slide.title} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex justify-end">
                    <div className="custom-pagination flex justify-center mt-5 xl:max-w-[568px] w-full">
                        {slides.map((_, index) => (
                            <span key={index} className={`dot ${activeIndex === index ? "dot-active" : ""}`} onClick={() => handleDotClick(index)}></span>))}
                    </div>
                </div>
            </div>
            <img className="absolute -top-5 left-0 pointer-events-none z-0" src={BookImage} alt="book ellipse" />
            <img className="absolute -bottom-7 left-0 max-xl:hidden" src={HeroEllipseSecond} alt="hero ellipse" />
        </div>
    );
};

export default Hero;