'use client'
import { navLinks } from '../../utils/helper'
import { Link, useLocation } from 'react-router-dom'
import PageLogo from '../../assets/images/png/logo.png'
import Icons from './Icons'
import { useEffect, useState } from 'react'
import Button from './Button'
import {
  HOME_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_SIGNUP_ROUTE,
} from '../../utils/constant'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '')
      const sectionElement = document.getElementById(sectionId)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location])

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    if (menuOpen) {
      document.body.classList.remove('overflow-hidden')
    } else {
      document.body.classList.add('overflow-hidden')
    }
  }
  const handleMobileLinkClick = (url) => {
    setMenuOpen(false)
    document.body.classList.remove('overflow-hidden')
    if (url.startsWith('#')) {
      const sectionId = url.replace('#', '')
      const sectionElement = document.getElementById(sectionId)
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  const locationPath = window.location.pathname
  return (
    <header className="relative z-10 overflow-x-clip py-3 md:py-5">
      <div className="container flex items-center justify-between gap-6 px-3 lg:max-w-[1184px]">
        <Link to={HOME_ROUTE} className="relative z-10">
          <img
            src={PageLogo}
            width={260}
            height={50}
            alt="logo"
            className="max-md:w-[169px]"
            unoptimized
          />
        </Link>
        <nav className="hidden items-center gap-6 xl:flex">
          {navLinks.map((obj, index) => {
            const isActive =
              location.hash === obj.url || locationPath === obj.url
            return (
              <div
                key={index}
                className="group relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                <Link
                  to={obj.url}
                  className={`leading-150 relative flex items-center gap-2 text-base font-normal transition-all duration-300 hover:text-primary ${
                    isActive &&
                    'text-primary before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-primary'
                  }`}
                >
                  {obj.title}{' '}
                  {obj.subLinks && (
                    <Icons iconName="dropdownBlue" className="size-4" />
                  )}
                </Link>
                {obj.subLinks && (
                  <div
                    className={`rounded-4 pointer-events-none absolute top-[25px] w-[102vw] bg-white pt-7 opacity-0 duration-300 group-hover:pointer-events-auto group-hover:opacity-100 ${obj.title.toLocaleLowerCase() === 'jobs' && '-left-[45.4vw]'} ${obj.title.toLocaleLowerCase() === 'services' && '-left-[49.6vw]'} ${obj.title.toLocaleLowerCase() === 'employers' && '-left-[57.1vw]'}`}
                  >
                    <div className="h-[1px] w-full border-t border-[#25346633]"></div>
                    <div className="container px-3 mx-auto lg:max-w-[1184px]">
                      <p className="border-b border-[#25346633] pb-[22px] pt-4 text-[16px] font-normal text-black">
                        {obj.title}
                      </p>
                      <div className="flex w-full flex-wrap py-6">
                        {obj.subLinks.map((subLink, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subLink.url}
                            className="text-slate hover:bg-gray-100 flex w-4/12 items-start gap-3 text-nowrap px-4 py-2 duration-300 hover:text-primary"
                          >
                            <Icons
                              className="mr-2 min-h-[23px] min-w-[23px]"
                              iconName={subLink.icon}
                            />
                            <p className="flex flex-col">
                              <span className="font-medium">
                                {subLink.title}
                              </span>
                              <span className="mt-[2px] text-wrap">
                                {subLink.description}
                              </span>
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="flex items-center gap-5 max-xl:hidden">
          <Button path={STUDENT_SIGNUP_ROUTE} transparentBtn="Sign up" />
          <Button path={STUDENT_LOGIN_ROUTE} bgBtn="Student’s Login" />
        </div>
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 xl:hidden">
          <div className="flex items-center gap-5 max-md:hidden">
            <Button path={STUDENT_SIGNUP_ROUTE} transparentBtn="Sign up" />
            <Button path={STUDENT_LOGIN_ROUTE} bgBtn="Student’s Login" />
          </div>
          <button
            onClick={toggleMenu}
            className="rounded-1 relative z-40 bg-primary p-[2px] md:p-[10px]"
          >
            <Icons
              iconName={menuOpen ? 'close' : 'hamburger'}
              className="size-6"
            />
          </button>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`absolute top-14 z-20 flex min-h-screen w-full flex-col gap-6 bg-primary px-4 py-20 transition-all duration-300 md:top-[90px] xl:hidden ${menuOpen ? 'right-0' : '-right-full'}`}
      >
        {navLinks.map((obj, index) => {
          const isActive = location.hash === obj.url
          return (
            <div
              key={index}
              className="group relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {!obj.subLinks ? (
                <>
                  <Link
                    to={obj.url}
                    onClick={toggleMenu}
                    className={`leading-150 relative flex items-center gap-2 text-base font-normal text-white transition-all duration-300 ${
                      isActive &&
                      'text-primary before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-primary'
                    }`}
                  >
                    {obj.title}
                  </Link>
                </>
              ) : (
                <>
                  <div
                    className={`leading-150 relative flex items-center gap-2 text-base font-normal text-white transition-all duration-300 ${
                      isActive &&
                      'text-primary before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-primary'
                    }`}
                  >
                    {obj.title}{' '}
                    {obj.subLinks && (
                      <Icons iconName="dropdownWhite" className="size-4" />
                    )}
                  </div>
                  {obj.subLinks && (
                    <div className="rounded-4 pointer-events-none absolute -left-6 top-8 z-10 w-fit bg-white opacity-0 shadow-nav duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                      {obj.subLinks.map((subLink, subIndex) => (
                        <Link
                          onClick={toggleMenu}
                          key={subIndex}
                          to={subLink.url}
                          className="text-slate hover:bg-gray-100 block text-nowrap px-4 py-2 duration-300 hover:text-primary"
                        >
                          {subLink.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
        <div className="flex items-center gap-3 max-sm:flex-col md:hidden">
          <Button
            className="!border bg-white text-center text-primary hover:!border-white hover:!bg-[transparent] hover:!text-white max-sm:w-full"
            path={STUDENT_SIGNUP_ROUTE}
            transparentBtn="Sign up"
            onClick={toggleMenu}
          />
          <Button
            className="border border-white text-center text-primary hover:bg-white hover:!text-primary max-sm:w-full"
            path={STUDENT_LOGIN_ROUTE}
            bgBtn="Student’s Login"
            onClick={toggleMenu}
          />
        </div>
      </div>
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed left-0 top-0 h-screen w-full"
        ></div>
      )}
    </header>
  )
}

export default Navbar
