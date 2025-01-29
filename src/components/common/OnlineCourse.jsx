import React from 'react'
import Heading from './Heading'
import Paragraph from './Paragraph'
import Button from './Button'
const OnlineCourse = ({
  image,
  heading,
  description,
  enrollPath,
  detailPath,
}) => {
  return (
    <div className="rounded-[20px] border border-primary p-4">
      <img
        className="min-h-[200px] w-full rounded-[20px] object-cover"
        src={image}
        alt="course image"
      />
      <Heading
        className="py-2.5 !text-xl !font-semibold !text-black xl:mb-0"
        middleText={heading}
      />
      <Paragraph
        className="mx-auto mb-3 max-w-[590px] !text-base font-normal text-black"
        text={description}
      />
      <div className="flex gap-3">
        <Button
          path={enrollPath}
          className="w-full !rounded-md !bg-primary text-white hover:!bg-white hover:!text-primary"
          transparentBtn="Enroll Now"
        />
        <Button
          path={detailPath}
          className="w-full !rounded-md"
          transparentBtn="More Detail"
        />
      </div>
    </div>
  )
}

export default OnlineCourse
