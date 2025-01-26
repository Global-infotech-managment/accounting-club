import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ bgBtn, transparentBtn, path, className }) => {
  return (
    <>
      {path ? (
        <Link
          className={`${className} flex h-12 items-center justify-center rounded-1 px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-3 sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border hover:!border-primary hover:!bg-white hover:!text-primary' : 'border border-primary bg-white text-primary hover:!border-primary hover:!bg-primary hover:!text-white'}`}
          to={path}
        >
          {transparentBtn}
          {bgBtn}
        </Link>
      ) : (
        <button
          className={`${className} flex h-12 items-center justify-center rounded-1 border border-[transparent] px-6 py-2 font-medium !leading-[133%] duration-300 sm:h-[52px] sm:py-[14px] sm:text-lg ${bgBtn ? 'bg-primary text-white hover:border-primary hover:bg-white hover:text-primary' : 'border-primary bg-white text-primary hover:border-primary hover:bg-primary hover:text-white'}`}
        >
          {transparentBtn}
          {bgBtn}
        </button>
      )}
    </>
  )
}

export default Button
