import React from 'react'
import Icons from '../common/Icons'
import {
  ADDRESS_ROUTE,
  EMAIL_ROUTE,
  INSTAGRAM_PATH,
  TELEPHONE_NUMBER,
  TWITTER_PATH,
} from '../../utils/constant'
import Input from '../common/Input'
import Button from '../common/Button'

const ContactUs = () => {
  return (
    <>
      <div className="container mt-10 flex flex-wrap rounded-[24px] p-[32px] px-3 shadow-job-card lg:max-w-[1184px]">
        <div className="w-6/12 rounded-[12px] bg-primary p-[32px] pe-5">
          <p className="mb-3 text-[32px] font-bold text-white">
            Contact Information
          </p>
          <p className="mb-[30px] text-base font-normal text-white">
            Reach out to us for queries, support, and assistance with your
            career journey today!
          </p>
          <div className="mb-[26px] flex items-center gap-3">
            <Icons iconName={'phone'} />
            <a
              href={TELEPHONE_NUMBER}
              className="text-base font-normal text-white"
            >
              +91-99880-27774
            </a>
          </div>
          <div className="mb-[26px] flex items-center gap-3">
            <Icons iconName={'contactMail'} />
            <a href={EMAIL_ROUTE} className="text-base font-normal text-white">
              aabhimalGroup@gmail.com
            </a>
          </div>

          <div className="mb-[32px] flex items-center gap-3">
            <Icons iconName={'address'} />
            <a
              href={ADDRESS_ROUTE}
              className="text-base font-normal text-white"
            >
              #18 royal, Enclave urban Estate, Phase 1, Patiala
            </a>
          </div>
          <div className="mb-[32px] h-[1px] w-full bg-white opacity-10"></div>
          <div className="mb-[26px] flex items-center gap-3">
            <Icons iconName={'twitter'} />
            <a href={TWITTER_PATH} className="text-base font-normal text-white">
              Accountant club12
            </a>
          </div>
          <div className="mb-[26px] flex items-center gap-3">
            <Icons iconName={'facebook'} />
            <a href={TWITTER_PATH} className="text-base font-normal text-white">
              Accountant club12
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Icons iconName={'instagram'} />
            <a
              href={INSTAGRAM_PATH}
              className="text-base font-normal text-white"
            >
              Accountant club12
            </a>
          </div>
        </div>
        {/* form */}
        <div className="w-6/12 ps-5">
          <p className="mb-4 text-[32px] font-bold text-black">Send Message</p>
          <form>
            <Input mainClassName={'mb-4'} type={'text'} placeholder={'Name'} />
            <Input
              mainClassName={'mb-4'}
              type={'email'}
              placeholder={'Email ID'}
            />
            <Input
              mainClassName={'mb-4'}
              type={'number'}
              placeholder={'Phone Number'}
            />
            {/* <Input
              mainClassName={'mb-4'}
              type={'text'}
              placeholder={'Message'}
              inputClassName={
                'min-h-[100px]  placeholder:text-start placeholder:top-0'
              }
            /> */}
            <label htmlFor="Message" className={`mb-[2px] text-sm text-black`}>
              Message <span className="text-orange-red">*</span>
            </label>
            <textarea
              className="mb-10 min-h-[100px] w-full rounded-[4px] border border-[#4E4E4E1A] bg-[#FBFBFB80] p-2 text-xs focus-visible:outline-[1px] focus-visible:outline-orange-red"
              placeholder="Type here..."
            ></textarea>
            <Button bgBtn="Submit" className={'w-full'} />
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactUs
