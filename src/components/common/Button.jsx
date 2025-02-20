import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
  bgBtn,
  disabled,
  transparentBtn,
  path,
  className,
  onClick,
  bgWhite,
}) => {
  return (
    <>
      {path ? (
        <Link
          onClick={onClick}
          className={`${className} flex h-12 items-center justify-center rounded-xl border border-[transparent] px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-[14px] sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border-primary hover:bg-white hover:text-primary' : 'border-primary bg-white text-primary hover:border-primary hover:bg-primary hover:text-white'} ${bgWhite && 'bg-white text-primary hover:border-white hover:bg-primary hover:text-white'}`}
          to={path}
        >
          {transparentBtn} {bgWhite}
          {bgBtn}
        </Link>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`${className} flex h-12 items-center justify-center rounded-xl border border-[transparent] px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-[14px] sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border-primary hover:bg-white hover:text-primary' : 'border-primary bg-white text-primary hover:border-primary hover:bg-primary hover:text-white'} ${bgWhite && 'bg-white text-primary hover:border-white hover:bg-primary hover:text-white'}`}
        >
          {transparentBtn}
          {bgWhite}
          {bgBtn}
        </button>
      )}
    </>
  )
}

export default Button
