import React from 'react'
import { Link } from 'react-router-dom'
import FooterLogo from '../../assets/images/png/footer-logo.png'
import { menuData } from '../../utils/helper'
import Icons from './Icons'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='bg-secondary pt-[185px] sm:pt-[209px] absolute w-full left-1/2 -translate-x-1/2 top-[57%] -z-[1]'>
            <div className='container lg:max-w-[1184px] px-3 pb-6 md:pb-10 lg:pb-14'>
                <div className='flex items-start justify-between gap-6 max-lg:flex-wrap'>
                    <div className='lg:max-w-[350px] w-full'>
                        <Link to="/">
                            <img className='max-w-[247px] w-full' src={FooterLogo} alt="footer logo" />
                        </Link>
                        <p className='text-sm !leading-150 text-white mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor</p>
                        <div className='flex gap-3 items-center mt-3 sm:hidden'>
                            <Icons iconName="twitter" />
                            <Icons iconName="facebook" />
                            <Icons iconName="instagram" />
                        </div>
                    </div>
                    <div className='xl:max-w-[732px] w-full flex max-md:flex-wrap justify-between gap-8 xl:gap-[73px]'>
                        {Object.entries(menuData).map(([category, items], index, array) => (
                            <div key={category}>
                                <h2 className={`${index === 3 ? 'max-sm:hidden' : 'inline-block'} !leading-150 text-base sm:text-lg font-medium text-white`}>
                                    {category}
                                </h2>
                                <div
                                    className={`${index === array.length - 1 ? 'flex flex-row max-sm:hidden' : 'flex flex-col'
                                        } gap-2 mt-3 sm:mt-5`}
                                >
                                    {items.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.link}
                                            className="font-normal !leading-150 text-sm text-white w-fit hover:text-opacity-70 duration-300 flex items-center gap-2"
                                        >{item.icon && <span>{item.icon}</span>}{item.name}</a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-footer-gradient h-px'></div>
            <p className='py-3 md:py-[18px] leading-140 text-white max-sm:text-xs text-sm text-center px-3'>Copyright Accountants Club {currentYear} | Privacy Policy | Terms & Conditions</p>
        </div>
    )
}

export default Footer