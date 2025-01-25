import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ bgBtn, transparentBtn, path, className }) => {
    return (
        <>
            {path ? (
                <Link className={`${className} h-12 sm:h-[52px] px-6 py-2 sm:pt-3 sm:pb-[13px] rounded-1 leading-[133%] font-medium text-lg duration-300 ${bgBtn ? "bg-primary text-white hover:!bg-white hover:!text-primary hover:border hover:!border-primary" : "text-primary bg-white border border-primary hover:!bg-primary hover:!text-white hover:!border-primary"}`} to={path}>
                    {transparentBtn}{bgBtn}
                </Link>
            ) : (
                <button className={`${className} h-12 sm:h-[52px] px-6 py-2 sm:py-[14px] duration-300 border border-[transparent] rounded-1 leading-[133%] font-medium text-lg ${bgBtn ? "bg-primary text-white hover:!bg-white hover:!text-primary hover:!border-primary" : "text-primary bg-white !border-primary hover:!bg-primary hover:!text-white hover:!border-primary"}`}>
                    {transparentBtn}{bgBtn}
                </button>
            )}
        </>
    )
}

export default Button