import React from 'react'
import { Link } from 'react-router-dom'
import FooterLogo from '../../assets/images/png/footer-logo.png'
import { menuData } from '../../utils/helper'
import Icons from './Icons'
import { HOME_ROUTE, TERM_AND_CONDITION_ROUTE } from '../../utils/constant'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className={`bg-primary pt-[64px]`}>
      <div className="container px-3 pb-6 md:pb-10 lg:max-w-[1184px] lg:pb-14">
        <div className="flex items-start justify-between gap-6 max-lg:flex-wrap">
          <div className="w-full lg:max-w-[350px]">
            <Link to={HOME_ROUTE}>
              <img
                className="w-full max-w-[200px] sm:max-w-[247px]"
                src={FooterLogo}
                alt="footer logo"
              />
            </Link>
            <p className="!leading-150 mt-2 text-[14px] text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolor
            </p>
            <div className="mt-3 flex items-center gap-3 sm:hidden">
              <Icons iconName="twitter" />
              <Icons iconName="facebook" />
              <Icons iconName="instagram" />
            </div>
          </div>
          <div className="flex w-full justify-between gap-8 max-md:flex-wrap xl:max-w-[732px] xl:gap-10">
            {Object.entries(menuData).map(([category, items], index, array) => (
              <div key={category}>
                <h2
                  className={`${index === 3 ? 'max-sm:hidden' : 'inline-block'} !leading-150 text-base sm:text-lg font-medium text-white`}
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
                      className="!leading-150 text-sm flex w-fit items-center gap-2 font-normal text-white duration-300 hover:text-opacity-70"
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
      <p className="leading-140 text-sm max-sm:text-xs px-3 py-3 text-center text-white md:py-[18px]">
        Copyright Accountants Club © {currentYear} |{' '}
        <a
          href={TERM_AND_CONDITION_ROUTE}
          className="transition-all duration-300 ease-in-out hover:text-secondary"
        >
          Privacy Policy
        </a>{' '}
        |{' '}
        <a
          href={TERM_AND_CONDITION_ROUTE}
          className="transition-all duration-300 ease-in-out hover:text-secondary"
        >
          Terms & Conditions
        </a>
      </p>
    </div>
  )
}

export default Footer
