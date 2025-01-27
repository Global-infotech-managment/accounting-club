import React from 'react'
import { Link } from 'react-router-dom'
import FooterLogo from '../../assets/images/png/footer-logo.png'
import { menuData } from '../../utils/helper'
import Icons from './Icons'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="absolute left-1/2 top-[60%] -z-[1] w-full -translate-x-1/2 bg-secondary pt-[210px] sm:pt-[209px] lg:top-[67%]">
      <div className="container px-3 pb-6 md:pb-10 lg:max-w-[1184px] lg:pb-14">
        <div className="flex items-start justify-between gap-6 max-lg:flex-wrap">
          <div className="w-full lg:max-w-[350px]">
            <Link to="/">
              <img
                className="w-full max-w-[200px] sm:max-w-[247px]"
                src={FooterLogo}
                alt="footer logo"
              />
            </Link>
            <p className="!leading-150 mt-2 text-sm text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
            <div className="mt-3 flex items-center gap-3 sm:hidden">
              <Icons iconName="twitter" />
              <Icons iconName="facebook" />
              <Icons iconName="instagram" />
            </div>
          </div>
          <div className="flex w-full justify-between gap-8 max-md:flex-wrap xl:max-w-[732px] xl:gap-[73px]">
            {Object.entries(menuData).map(([category, items], index, array) => (
              <div key={category}>
                <h2
                  className={`${index === 3 ? 'max-sm:hidden' : 'inline-block'} !leading-150 text-base font-medium text-white sm:text-lg`}
                >
                  {category}
                </h2>
                <div
                  className={`${
                    index === array.length - 1
                      ? 'flex flex-row max-sm:hidden'
                      : 'flex flex-col'
                  } mt-3 gap-2 sm:mt-5`}
                >
                  {items.map((item, i) => (
                    <a
                      key={i}
                      href={item.link}
                      className="!leading-150 flex w-fit items-center gap-2 text-sm font-normal text-white duration-300 hover:text-opacity-70"
                    >
                      {item.icon && <span>{item.icon}</span>}
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px bg-footer-gradient"></div>
      <p className="leading-140 px-3 py-3 text-center text-sm text-white max-sm:text-xs md:py-[18px]">
        Copyright Accountants Club {currentYear} | Privacy Policy | Terms &
        Conditions
      </p>
    </div>
  )
}

export default Footer
