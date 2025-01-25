import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ bgBtn, transparentBtn, path, className }) => {
    return (
        <>
            {path ? (
                <Link className={`${className} h-[52px] px-6 pt-3 pb-[13px] rounded-1 leading-[133%] font-medium text-lg ${bgBtn ? "bg-primary text-white" : "text-primary bg-white border border-primary"}`} to={path}>
                    {transparentBtn}{bgBtn}
                </Link>
            ) : (
                <button className={`${className} h-[52px] px-6 py-[14px] rounded-1 leading-[133%] font-medium text-lg ${bgBtn ? "bg-primary text-white" : "text-primary bg-white border border-primary"}`}>
                    {transparentBtn}{bgBtn}
                </button>
            )}
        </>
    )
}

export default Button