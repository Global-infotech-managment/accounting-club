import faqLine from '../../assets/images/svg/faqLine.svg'
import { CONTACT_ROUTE } from '../../utils/constant'
import { accordionContent } from '../../utils/helper'
import { Accordion } from './Accodian'
import Button from './Button'
import Icons from './Icons'

const FAQ = () => {
  return (
    <div className="container mt-[50px] w-full px-3 sm:mt-16 lg:mt-[110px] lg:max-w-[1184px]">
      <p className="mb-4 text-center text-[30px] font-bold leading-tight text-black sm:text-[35px] md:text-[40px] lg:text-[48px]">
        Frequently Asked <span className="text-gradient">Questions</span>
      </p>
      <p className="mx-auto max-w-[611px] text-center text-[14px] font-normal text-black md:text-[16px]">
        Clear and Concise Answers to Common Queries for Better Understanding and
        Hassle-Free Experience.
      </p>
      <img
        src={faqLine}
        alt="faq line"
        className="mx-auto w-full max-w-[394px]"
      />
      <div className="mt-[51px] flex flex-wrap">
        <div className="w-full lg:w-7/12 lg:pe-[27px]">
          <Accordion items={accordionContent} />
        </div>
        <div className="mt-5 w-full lg:mt-0 lg:w-5/12 lg:ps-[27px]">
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-black border-opacity-5 bg-[linear-gradient(180deg,_rgba(255,_255,_255,_0.6)_0%,_rgba(247,_250,_255,_0.6)_100%)] p-[34px]">
            <Icons iconName={'message'} />
            <p className="mb-3 mt-[30px] text-center text-[16px] font-medium text-black md:text-[20px]">
              Do you have more questions?
            </p>
            <p className="mb-10 text-center text-[14px] font-normal text-black md:text-[16px]">
              End-to-end payments and financial management in a single solution.
              Meet the right platform to help realize.
            </p>
            <Button bgWhite={'Shoot a Direct Mail'} path={CONTACT_ROUTE} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
