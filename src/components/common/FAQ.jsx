import faqLine from '../../assets/images/svg/faqLine.svg'
import { accordionContent } from '../../utils/helper'
import { Accordion } from './Accodian'

const FAQ = () => {
  return (
    <div className="container mt-[110px] w-full px-3 lg:max-w-[1184px]">
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
        <div className="w-7/12">
          <Accordion items={accordionContent} />
        </div>
        <div className="w-5/12"></div>
      </div>
    </div>
  )
}

export default FAQ
