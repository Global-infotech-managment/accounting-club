import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  bgBtn,
  disabled,
  transparentBtn,
  path,
  className,
  onClick,
}) => {
  return (
    <>
      {path ? (
        <Link
          onClick={onClick}
          className={`${className} rounded-xl flex h-12 items-center justify-center border border-[transparent] px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-[14px] sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border-primary hover:bg-white hover:text-primary' : 'border-primary bg-white text-primary hover:border-primary hover:bg-primary hover:text-white'}`}
          to={path}
        >
          {transparentBtn}
          {bgBtn}
        </Link>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`${className} rounded-xl flex h-12 items-center justify-center border border-[transparent] px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-[14px] sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border-primary hover:bg-white hover:text-primary' : 'border-primary bg-white text-primary hover:border-primary hover:bg-primary hover:text-white'}`}
        >
          {transparentBtn}
          {bgBtn}
        </button>
      )}
    </>
  )
}

export default Button
