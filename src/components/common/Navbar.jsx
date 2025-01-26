'use client'
import { navLinks } from '../../utils/helper'
import { Link, useLocation } from 'react-router-dom'
import PageLogo from '../../assets/images/png/logo.png'
import Icons from './Icons'
import { useEffect, useState } from 'react'
import Button from './Button'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const location = useLocation()

  // Scroll to section on location change
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
    setDropdownOpen(null) // Close dropdowns when the menu closes
  }

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  return (
    <header className="relative z-10 py-3 shadow-nav md:py-5">
      <div className="container flex items-center justify-between gap-6 px-3 lg:max-w-[1184px]">
        <Link to="/">
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
          {navLinks.map((obj, index) => (
            <div key={index} className="group relative">
              <Link
                to={obj.url}
                className={`relative flex items-center gap-2 text-base font-normal leading-150 text-light-black transition-all duration-300 ${
                  obj.title === 'Home'
                    ? 'text-primary duration-300 before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-primary'
                    : ''
                }`}
              >
                {obj.title}{' '}
                {obj.subLinks && (
                  <Icons iconName="dropdown" className="size-4" />
                )}
              </Link>
              {obj.subLinks && (
                <div className="absolute -left-6 w-fit rounded-4 bg-white opacity-0 shadow-nav duration-300 group-hover:opacity-100">
                  {obj.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subLink.url}
                      className="text-slate hover:bg-gray-100 block text-nowrap px-4 py-2"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-5 max-xl:hidden">
          <Button path={'/'} transparentBtn="Sign up" />
          <Button bgBtn="Student’s Login" />
        </div>
        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 xl:hidden">
          <div className="flex items-center gap-5 max-md:hidden">
            <Button path={'/'} transparentBtn="Sign up" />
            <Button bgBtn="Student’s Login" />
          </div>
          <button
            onClick={toggleMenu}
            className="relative z-40 rounded-1 bg-primary p-[2px] md:p-[10px]"
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
        className={`absolute top-14 z-20 flex min-h-screen w-full flex-col gap-3 bg-primary px-4 py-20 transition-all duration-300 md:top-[90px] xl:hidden ${
          menuOpen ? 'right-0' : '-right-full'
        }`}
      >
        {navLinks.map((obj, index) => (
          <div key={index} className="relative">
            <Link
              to={obj.url}
              className="flex items-center gap-2 text-base font-normal leading-150 text-white"
              onClick={() => toggleDropdown(index)}
            >
              {obj.title}
              {obj.subLinks && (
                <Icons
                  iconName="dropdownWhite"
                  className="size-4 stroke-white"
                />
              )}
            </Link>
            {dropdownOpen === index && obj.subLinks && (
              <div className="bg-gray-100 rounded-md mt-2 flex items-center gap-4">
                {obj.subLinks.map((subLink, subIndex) => (
                  <Link
                    key={subIndex}
                    to={obj.url}
                    z
                    className="text-base font-normal leading-150 text-white"
                  >
                    {subLink.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex items-center gap-3 max-sm:flex-col md:hidden">
          <Button
            className="!border bg-white text-center text-primary hover:!border-white hover:!bg-[transparent] hover:!text-white max-sm:w-full"
            path={'/'}
            transparentBtn="Sign up"
          />
          <Button
            className="border border-white text-center text-primary hover:bg-white hover:!text-primary max-sm:w-full"
            bgBtn="Student’s Login"
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
